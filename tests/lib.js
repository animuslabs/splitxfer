import { Asset, Authority, Name, PermissionLevel, PermissionLevelWeight, Serializer, TimePoint, UInt16, UInt32 } from "@greymass/eosio"
import { Blockchain,  AccountPermission } from "@proton/vert"
export const chain = new Blockchain()

export const contract = chain.createContract("contract", "../build/contract")
export const token = chain.createContract("eosio.token", "../src/external/token/token.contract")


const testAcct = chain.createAccount("test")


export async function initTokens() {
  const issuer = Name.from("eosio.token")
  const maximum_supply = "25000000000.0000 TST"
  await tkn("create", { issuer, maximum_supply })
  await tkn("issue", { to: issuer, quantity: maximum_supply, memo: "" })
}

export async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
export function oracles() {
  return contract.tables.oracles().getTableRows()
}

export function act(name, params = {}, permission = "contract@active") {
  return contract.actions[name](params).send(permission)
}
export function tkn(name, params = {}, permission = "eosio.token@active") {
  return token.actions[name](params).send(permission)
}

export function logActions() {
  console.log(chain.actionTraces.map(el => [el.action.toString(), JSON.stringify(el.decodedData, null, 2)]))
}
export function logChain() {
  console.log(chain.console)
}

export async function init() {
  await sleep(1)
  await initTokens()
}

export function getReportId(report = {protocol_id:0,round:0,units:0}) {
  return Number((BigInt(report.protocol_id) << BigInt(48)) + (BigInt(report.round) << BigInt(32)) + BigInt(report.units))
}
