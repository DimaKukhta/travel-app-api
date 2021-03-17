import { MongoClient, Collection } from 'mongodb'

const url = 'mongodb+srv://dima:12345@cluster0.pglaf.mongodb.net/?retryWrites=true&w=majority';

const dbName = 'travel-app';
const collectionName = 'api';

const getMongoInstance = async () => {
    const client = await MongoClient.connect(url);
        
    return client.db(dbName);
}

const getMongoCollection = async (): Promise<Collection> => {
    const db = await getMongoInstance();

    return db.collection(collectionName);
} 

const getCountry = async (name: string) => {
    const collection = await getMongoCollection();
    return collection.findOne({'name': name});
};

const getAllCountry = async () => {
    const collection = await getMongoCollection();
    return collection.find({}).toArray();
};

const createStatistics = async (name: string) => {
    const collection = await getMongoCollection();
    console.log(name)
    const response = await collection.insertOne({
        name: `Stats${name}`,
        rating: []
    })
    return response.ops[0];
}

const updateStatistics = async (name: string, rating: any) => {
    const collection = await getMongoCollection();
    return collection.updateOne(
        { name: `Stats${name}` }, 
        {$set: { ...rating }},
        { upsert: false });
}

const getStatsCountry = async (name: string) => {
    const collection = await getMongoCollection();
    return collection.findOne({'name': `Stats${name}`});
};


export {
    getCountry,
    getAllCountry,
    createStatistics,
    updateStatistics,
    getStatsCountry
}