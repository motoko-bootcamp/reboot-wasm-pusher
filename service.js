
import Agent from '@dfinity/agent'; 
import { identityFromSeed } from './Utils/identities.js';
import {readFileSync} from 'fs';
const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));
import {idlFactory} from './idl/service.did.js';
import "dotenv/config.js";


const registerModule = async (name, version, network, canisterId, path) => {
    const moduleRegistryActor = await createActor(canisterId, idlFactory, {
        agentOptions: { host: network, fetch },
    });

    try {
        console.log("path", path);
        const res = await moduleRegistryActor.reboot_registry_registerModule(
            name,
            version,
            getWasm(path)
        );

        return res;
    } catch (e) {
        console.error(e);
    };
};

const createActor = async (canisterId, idl, options)=> {
    const phrase = process.env.SEEDPHRASE;
    const identity = await identityFromSeed(phrase);
    const agent = new Agent.HttpAgent({ ...options?.agentOptions, identity });
    await agent.fetchRootKey();

    return Agent.Actor.createActor(idl, {
        agent,
        canisterId,
        ...options?.actorOptions,
    });
};

const getWasm = (path) => {
    const localPath = path;
    const buffer = readFileSync(localPath);
    return [...new Uint8Array(buffer)];
};

export { registerModule };