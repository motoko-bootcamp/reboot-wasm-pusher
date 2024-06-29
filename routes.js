import { Router } from 'express';
import { registerWasm } from './service.js';

const router = Router()

router.get('/', (req, res) => {
    registerWasm();
})

const _default = router;
export { _default as default };