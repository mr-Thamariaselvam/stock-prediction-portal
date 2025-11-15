from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import StockPredictionSerializers

import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, r2_score

from pathlib import Path
from keras.models import load_model
import traceback

# -----------------------------------
#  LOAD MODEL ONLY ONCE
# -----------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "stock_prediction_model.keras"

print("MODEL PATH:", MODEL_PATH)

try:
    model = load_model(MODEL_PATH)
    print("MODEL LOADED SUCCESSFULLY")
except Exception as e:
    print("ERROR LOADING MODEL:", e)
    model = None


class StockPredictionAPIView(APIView):
    def post(self, request):
        try:
            # Validate Input
            serializer = StockPredictionSerializers(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=400)

            ticker = serializer.validated_data.get("ticker")
            now = datetime.now()
            start = datetime(now.year - 10, now.month, now.day)

            # Fetch Stock Data
            df = yf.download(ticker, start, now)

            if df.empty:
                return Response({"error": "No stock data found"}, status=404)

            df = df.reset_index()

            # -----------------------------------------
            #   FIRST PLOT – Closing Price
            # -----------------------------------------
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(df["Close"], label="Closing Price")
            plt.title(f"Closing Price of {ticker}")
            plt.legend()
            plot_img = save_plot(f"{ticker}_plot.png")

            # -----------------------------------------
            #   100 DMA
            # -----------------------------------------
            ma100 = df.Close.rolling(100).mean()
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label="Closing Price")
            plt.plot(ma100, "red", label="100 DMA")
            plt.legend()
            plot_100_dma = save_plot(f"{ticker}_100_dma.png")

            # -----------------------------------------
            #   200 DMA
            # -----------------------------------------
            ma200 = df.Close.rolling(200).mean()
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label="Closing Price")
            plt.plot(ma100, "red", label="100 DMA")
            plt.plot(ma200, "green", label="200 DMA")
            plt.legend()
            plot_200_dma = save_plot(f"{ticker}_200_dma.png")

            # -----------------------------------------
            #   CHECK MODEL
            # -----------------------------------------
            if model is None:
                return Response({"error": "Model failed to load"}, status=500)

            # -----------------------------------------
            #   DATA PREPARATION
            # -----------------------------------------
            data_training = pd.DataFrame(df.Close[: int(len(df) * 0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df) * 0.7):])

            scaler = MinMaxScaler(feature_range=(0, 1))

            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test = []
            y_test = []

            for i in range(100, len(input_data)):
                x_test.append(input_data[i - 100:i])
                y_test.append(input_data[i][0])

            x_test = np.array(x_test)
            y_test = np.array(y_test)

            # -----------------------------------------
            #   PREDICT
            # -----------------------------------------
            y_pred = model.predict(x_test)

            y_pred = scaler.inverse_transform(y_pred).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

            # -----------------------------------------
            #   FINAL PREDICTION PLOT
            # -----------------------------------------
            plt.figure(figsize=(12, 5))
            plt.plot(y_test, label="Original Price", color="blue")
            plt.plot(y_pred, label="Predicted Price", color="red")
            plt.title(f"Final Prediction of {ticker}")
            plt.legend()
            plot_prediction = save_plot(f"{ticker}_prediction.png")

            # -----------------------------------------
            #   METRICS
            # -----------------------------------------
            mse = mean_squared_error(y_test, y_pred)
            rmse = np.sqrt(mse)
            r2 = r2_score(y_test, y_pred)

            return Response(
                {
                    "status": "success",
                    "plot_img": plot_img,
                    "plot_100_dma": plot_100_dma,
                    "plot_200_dma": plot_200_dma,
                    "plot_prediction": plot_prediction,
                    "mse": mse,
                    "rmse": rmse,
                    "r2": r2,
                },
                status=200,
            )

        except Exception as e:
            print("-------- ERROR OCCURRED --------")
            traceback.print_exc()
            return Response({"error": str(e)}, status=500)
