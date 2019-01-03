const cron = require('node-cron');
const mongoDB = global.mongoDB;
const { syncSingle, seedSingle } = require('../mongoOperations')

const pickTaskListFromDb = async (params) => {
    try {
        const taskArr = await global.mongoDB.collection('task_db').find({}).toArray();
        const activeTb = taskArr.filter((e) => {
            if (e.enableSync) {
                return e;
            }
        })
        return activeTb
    } catch (err) {
        throw err;
    }
}

const pickTaskListForSeeding = async (params) => {
    try {
        const taskArr = await global.mongoDB.collection('task_db').find({ 'seed': true }).toArray();
        return taskArr;
    } catch (err) {
        throw err;
    }
}

const activeTasks = async (params) => {
    try {
        const activeTasks = await pickTaskListFromDb();
        const activeTaskList = await Promise.all(activeTasks.map(async (e) => {
            const singleUp = await syncSingle({ collectionName: e.tableName });
            if (!e.periodic) {
                const updateCollection = await global.mongoDB.collection('task_db').updateOne({
                    tableName: e.tableName
                }, {
                        $set: { 'enableSync': false }
                    })
            }
            return singleUp;
        }))
        return activeTaskList;
    } catch (err) {
        throw err;
    }
}

const seedTasks = async () => {
    try {
        const seedTasks = await pickTaskListForSeeding();
        const seedTaskList = await Promise.all(seedTasks.map(async (e) => {
            const seedSingleRes = await seedSingle({ collectionName: e.tableName });
            const updateCollection = await global.mongoDB.collection('task_db').updateOne({
                tableName: e.tableName, seed: true
            }, {
                    $set: { 'seed': false }
                })
            return seedSingleRes
        }))
        return { seeded: seedTaskList.length };
    } catch (err) {
        throw err;
    }
}

const enableCron = () => {
    const startTime = Date.now();
    console.log('initialized cron sync')
    cron.schedule('*/1 * * * *', () => {
        activeTasks().then((res) => {
            console.log('response', res)
            console.log('\nexecuted at\n', Date.now() - startTime)
        }).catch((err) => {
            console.log('error', err);
            console.log('\n error at\n', Date.now() - startTime)
        })
    });
}

module.exports = {
    enableCron,
    seedTasks
}