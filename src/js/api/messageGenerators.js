export default {
    genStartScanning: (quality, partialScanning, angle) => {
        return {
            action: "startScanning",
            data: {
                quality: quality,
                partialScanning: partialScanning,
                angle: angle
            }
        }
    },
    genCancelScanning: () => {
        return {
            action: "cancelScanning"
        }
    },
    genFinishScanning: () => {
        return {
            action: "finishScanning"
        }
    },
    genDeleteFile: () => {
        return {
            action: "deleteFile"
        }
    },
    genSaveFile: (filename) => {
        return {
            action: "saveFile",
            data: {
                filename: filename
            }
        }
    }
}