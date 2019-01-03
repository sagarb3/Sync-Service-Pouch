var pouchDBMap = {};
var baseUrl = 'ws://localhost:5000';
const syncCollections = [
    'addressProofMaster',
    'ageProofMaster',
    'appointeeRelationMaster',
    'banksMaster',
    'basePlanDecisionMaster',
    'BIProductMaster',
    'causeOfDeathMaster',
    'channelProductMapping',
    'chequeTypeMaster',
    'cityMaster',
    'comboCauseOfDeathMaster',
    'countryMaster',
    'cvdDeclinedReason',
    'cvdPrevPolicyProductCiteria',
    'eduMaster',
    'eNachBankMapping',
    'familyRelationMaster',
    'healthInsuranceCompaniesMaster',
    'healthStatusMaster',
    'identityProofMaster',
    'incomeProofMaster',
    'insuranceCompaniesMaster',
    'irMasterNew',
    'maritalStatusMaster',
    'nationalityMaster',
    'natureOfDutiesMaster',
    'nomineeRelationMaster',
    'occupationMaster',
    'orgMaster',
    'paramilitarySubSection',
    'passwordRuleMaster',
    'payerRelationMaster',
    'pincodeMaster',
    'productFeatureMaster',
    'productMaster',
    'proposerRelationMaster',
    'qualificationMaster',
    'residentialStatusMaster',
    'stateMaster',
    'wealthcauseOfDeathMaster'
];

syncCollections.forEach((e, index) => {
    pouchDBMap[e] = {
        localDbName: e,
        local: new PouchDB(e),
        remote: new PouchDB(
            { adapter: 'socket', name: e, url: baseUrl }
        ),
        timeIndex: (index + 1) * 100
    }
})

window['mdDbs'] = pouchDBMap;

const replicate = (pouchObj, options) => {
    PouchDB.replicate(pouchObj.remote, pouchObj.localDbName, options)
        .on('change', function (info) {
            //
        })
        .on('paused', function (err) {
           //
        })
        .on('active', function () {
            //
        })
        .on('denied', function (err) {
            //
        })
        .on('complete', function (info) {
            //
        })
        .on('error', function (err) {
            //
        });
}


const syncAll = () => {
    for (let key in pouchDBMap) {
        replicate(pouchDBMap[key], { live: true, retry: true })
    }
}

const getDocs = async (collectionName) => {
    try {
        var db = pouchDBMap[collectionName].local
        var result = await db.allDocs({
            include_docs: true,
            attachments: true
        });
        var { rows } = result;
        return {
            rows,
            length: rows.length
        };
    } catch (err) {
        throw err;
    }
}

syncAll();

