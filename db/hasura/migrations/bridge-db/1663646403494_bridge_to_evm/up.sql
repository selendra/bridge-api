CREATE TABLE IF NOT EXISTS public.toEvmBridge (  
  blockNumber BIGINT NOT NULL,
  blockHash TEXT NOT NULL,
  amount TEXT NOT NULL,
  sender TEXT NOT NULL,
  recipient TEXT NOT NULL,
  chainId  INT NOT NULL,
  "timestamp" timestamp with time zone NOT NULL
);
