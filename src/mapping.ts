import { BigInt, log } from '@graphprotocol/graph-ts'
import { Bank, AddDebt, Approval, Kill, OwnershipTransferred, RemoveDebt, Transfer, Work } from '../generated/Bank/Bank'
import { Position } from '../generated/schema'
import { ethereum, Address } from '@graphprotocol/graph-ts'
/* 

let BLOCKS_PER_12_HOURS = BigInt.fromI32(3300)
let DEPLOYMENT_TIMESTAMP = BigInt.fromI32(1613250683)

function formatId(id: BigInt): string {
  return id.toString() + '-v1'
}
 */
export function handleBlock(block: ethereum.Block): void {
  /*   let _MS_PER_DAY = 1000 * 60 * 60 * 24
    let differenceInDays = (DEPLOYMENT_TIMESTAMP - block.timestamp) * BigInt.fromI32(1000) / BigInt.fromI32(_MS_PER_DAY)
  
    log.debug(`difference in days: {}`, [differenceInDays.toString()])
  
    if (differenceInDays <= BigInt.fromI32(2) || block.number.mod(BLOCKS_PER_12_HOURS) == BigInt.fromI32(0)) {
      let contract = Bank.bind(
        Address.fromString('0x67b66c99d3eb37fa76aa3ed1ff33e8e39f0b9c7a'),
      )
  
      let N = contract.nextPositionID()
      let i = BigInt.fromI32(1)
  
      while (i < N) {
        let id = formatId(i)
        let position = Position.load(id)
  
        let positionInfo = contract.positionInfo(i)
        position.ethValue = positionInfo.value0
        position.debt = positionInfo.value1
        position.lastUpdated = block.timestamp.toI32()
        position.save()
  
        i = i.plus(BigInt.fromI32(1))
      }
    } */
}

export function handleAddDebt(event: AddDebt): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  /* let entity = ExampleEntity.load(event.transaction.from.toHex()) */
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  /*  if (entity == null) {
     entity = new ExampleEntity(event.transaction.from.toHex())
 
     // Entity fields can be set using simple assignments
     entity.count = BigInt.fromI32(0)
   } */
  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)
  // Entity fields can be set based on event parameters
  // entity.id = event.params.id
  // entity.debtShare = event.params.debtShare
  // Entities can be written to the store with `.save()`
  // entity.save()
  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.
  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.config(...)
  // - contract.debtShareToVal(...)
  // - contract.debtValToShare(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.glbDebtShare(...)
  // - contract.glbDebtVal(...)
  // - contract.increaseAllowance(...)
  // - contract.isOwner(...)
  // - contract.lastAccrueTime(...)
  // - contract.name(...)
  // - contract.nextPositionID(...)
  // - contract.owner(...)
  // - contract.pendingInterest(...)
  // - contract.positionInfo(...)
  // - contract.positions(...)
  // - contract.reservePool(...)
  // - contract.symbol(...)
  // - contract.totalETH(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
}

/* export function handleApproval(event: Approval): void { } */

export function handleKill(event: Kill): void {
  // Alpha Homora V1
  /*   {
      let id = formatId(event.params.id)
      let position = Position.load(id)
  
      position.killed = true
      position.killedTxnId = event.transaction.hash
      position.killer = event.params.killer
      position.prize = event.params.prize
      position.left = event.params.left
      position.killedOn = event.block.timestamp.toI32()
  
      position.save()
    } */
}

/* export function handleOwnershipTransferred(event: OwnershipTransferred): void { }

export function handleRemoveDebt(event: RemoveDebt): void { }

export function handleTransfer(event: Transfer): void { }

export function handleWorkHomoraV1(event: Work): void { }
 */

export function handleWork(event: Work): void {
  let contract = Bank.bind(event.address)

  let id = event.params.id

  let position = Position.load(id.toString())
  if (!position) {
    position = new Position(id.toString())
    let positionInfo = contract.positionInfo(id)

    position.owner = event.transaction.from
    position.txnHash = event.transaction.hash
    position.createdOn = event.block.timestamp.toI32()
    position.positionOpenBalance = positionInfo.value0
    position.positionOpenDebt = positionInfo.value1

    position.save()
  }
}
