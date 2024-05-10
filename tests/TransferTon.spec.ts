import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { TransferTon } from '../wrappers/TransferTon';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('TransferTon', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('TransferTon');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let transferTon: SandboxContract<TransferTon>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        transferTon = blockchain.openContract(TransferTon.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await transferTon.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: transferTon.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and transferTon are ready to use
    });
});
