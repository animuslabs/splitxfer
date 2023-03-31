import { ActionData, Asset, check, Contract, ExtendedAsset, InlineAction, Name, PermissionLevel, unpackActionData } from "proton-tsc"

@packer
export class TokenTransfer extends ActionData {
  constructor(
        public from:Name = new Name(),
        public to:Name = new Name(),
        public quantity:Asset = new Asset(),
        public memo:string = ""
  ) {
    super()
  }
}

@contract
export class SplitXfer extends Contract {
  sendTokens(to:Name, quantity:ExtendedAsset, memo:string):void {
    const action = new InlineAction<TokenTransfer>("transfer").act(quantity.contract, new PermissionLevel(this.receiver))
    const actionParams = new TokenTransfer(this.receiver, to, quantity.quantity, memo)
    action.send(actionParams)
  }

  @action("transfer", notify)
  onDeposit():void {
    let params = unpackActionData<TokenTransfer>()
    if (params.from == this.receiver) return
    if (params.to != this.receiver) return
    const distList:string[] = params.memo.split(" ")
    if (distList.length == 0) return
    const nameList:Name[] = []
    for (let i = 0; i < distList.length; i++) {
      nameList.push(Name.fromString(distList[i]))
    }
    const numReceivers = nameList.length
    let splitAmount = params.quantity.amount / numReceivers
    let sendAsset = new ExtendedAsset(new Asset(splitAmount, params.quantity.symbol), this.firstReceiver)
    for (let i = 0; i < numReceivers; i++) {
      this.sendTokens(nameList[i], sendAsset, "split transfer")
    }
  }
}
