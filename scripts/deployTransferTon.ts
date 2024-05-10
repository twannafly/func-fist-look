import { toNano } from '@ton/core';
import { TransferTon } from '../wrappers/TransferTon';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const transferTon = provider.open(TransferTon.createFromConfig({}, await compile('TransferTon')));

    await transferTon.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(transferTon.address);

    // run methods on `transferTon`
}
