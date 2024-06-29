
import Agent from '@dfinity/agent'; 
import { identityFromSeed } from './Utils/identities.js';
import {readFileSync} from 'fs';
const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));
import {idlFactory} from './idl/service.did.js';


const registerWasm = async () => {
    
    const moduleRegistryActor = await createActor("aovwi-4maaa-aaaaa-qaagq-cai", idlFactory, {
        agentOptions: { host: "http://localhost:4943", fetch },
    });

    try {
        const res = await moduleRegistryActor.reboot_registry_registerModule(
            "icrc_nft",
            "0.1.0",
            getWasm()
        );

        console.log(res);
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
        console.log(localPath);
    const buffer = readFileSync(localPath);
    return [...new Uint8Array(buffer)];
};

export { registerWasm };