import { chain, init,logChain,tkn ,logActions} from "./lib.js"

await init()
chain.createAccount("receiver1")
chain.createAccount("receiver2")
chain.createAccount("receiver3")
await tkn("transfer", {
  from: "eosio.token",
  to: "contract",
  quantity: "100.0000 TST",
  memo: "receiver1 receiver2 receiver3"
})
logChain()
logActions()

