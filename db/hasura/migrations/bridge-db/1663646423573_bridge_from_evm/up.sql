CREATE TABLE IF NOT EXISTS public.fromEvmBridge (  
  transactionId SERIAL PRIMARY KEY,
  sender TEXT NOT NULL,
  recipient TEXT NOT NULL,
  amount TEXT NOT NULL,
  transactionHash TEXT NOT NULL,
  bridgeNetework TEXT NOT NULL,
  bridgeNetworkId INT NOT NULL,
  bridgeErc20Address TEXT NOT NULL,
  bridgeAddress TEXT NOT NULL,
  bridgeErc20HandlerAddress TEXT NOT NULL,
  "timestamp" timestamp with time zone NOT NULL
);
