import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TransferTonConfig = {};

export function transferTonConfigToCell(config: TransferTonConfig): Cell {
    return beginCell().endCell();
}

export class TransferTon implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TransferTon(address);
    }

    static createFromConfig(config: TransferTonConfig, code: Cell, workchain = 0) {
        const data = transferTonConfigToCell(config);
        const init = { code, data };
        return new TransferTon(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
