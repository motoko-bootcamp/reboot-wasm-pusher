
import Agent from '@dfinity/agent'; 
import { identityFromSeed } from './Utils/identities.js';
import {readFileSync} from 'fs';
const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));
import {idlFactory} from './idl/service.did.js';
import "dotenv/config.js";


const registerModule = async (name, version) => {
    
    const moduleRegistryActor = await createActor(process.env.CANISTERID, idlFactory, {
        agentOptions: { host: process.env.NETWORK, fetch },
    });

    try {
        const res = await moduleRegistryActor.reboot_registry_registerModule(
            name,
            version,
            getWasm()
        );

        return res;
    } catch (e) {
        console.error(e);
    };
};

const createActor = async (canisterId, idl, options)=> {
    const phrase = "ricardo ricardo ricardo ricardo ricardo ricardo ricardo ricardo ricardo ricardo ricardo ricardo";
    const identity = await identityFromSeed(phrase);
    const agent = new Agent.HttpAgent({ ...options?.agentOptions, identity });
    await agent.fetchRootKey();

    return Agent.Actor.createActor(idl, {
        agent,
        canisterId,
        ...options?.actorOptions,
    });
};

const getWasm = () => {
    const localPath = 
        `${process.cwd()}/yourwasmhere/icrc_nft.wasm`;
    const buffer = readFileSync(localPath);
    return [...new Uint8Array(buffer)];
};

export { registerModule };