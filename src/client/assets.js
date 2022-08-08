const ASSET_NAMES = ['magechar.png', 'smallfireball.png', 'mainmapio.png', 'hud3hp.png', 'hud2hp.png', 'hud1hp.png'];

const assets = {};
const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName){
    return new Promise(resolve => {
        const asset = new Image();
        asset.onload = () => {
            console.log(`Downloaded ${assetName}`);
            assets[assetName] = asset;
            resolve();
        };
        asset.src = `/assets/${assetName}`;
    });
}

export const downloadAssets = () => downloadPromise;
export const getAsset = assetName => assets[assetName];