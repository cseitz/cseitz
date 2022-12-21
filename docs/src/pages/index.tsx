import React, { useCallback, useRef, useState } from 'react'
// @ts-ignore
import { useFiber } from 'its-fine';

function useHookState() {
    const fiber = useFiber();
    let target = fiber?.memoizedState;
    const found = new Array<{ memoizedState: any }>();
    while (target) {
        found.push(target);
        target = target.next;
    }
    console.log(found);
    return found;
}

function _useControllerState(name: string) {
    const hooks = useHookState();
    const found = hooks.filter(o => o.memoizedState?.current)
        .filter(o => '$controller' in o.memoizedState?.current)
        .find(o => o.memoizedState?.current?.$controller?.name === name)
    if (found) {
        return found?.memoizedState?.current?.$controller?.state;
    }
}

function createController(name: string, cb: any) {
    return function () {
        const currentState = _useControllerState(name);
        // if (currentState) return currentState;
        const result = cb();
        const ref = useRef<any>();
        ref.current = !currentState ? {
            $controller: {
                name,
                state: result,
            }
        } : {};
        console.log(name, currentState)
        return currentState || result;
    }
}

function useControllers() {

}


const random = createController('random', () => {
    return Math.random()
})

const counter = createController('counter', () => {
    const [count, setCount] = useState(0);

    const rand = random();

    return [count, setCount]
})


import { Button } from '@mantine/core';
import { GithubIcon } from '@cseitz/fontawesome-react/github';
import { PlusIcon } from '@cseitz/fontawesome-react/plus';
import { UserPlusIcon } from '@cseitz/fontawesome-react/userPlus';

import { Icon } from '@cseitz/icons';
import { faHouse } from '@cseitz/icons/regular/house';

const HouseIcon = Icon(faHouse);

// import '@cseitz/fontawesome-react'
// import { Number0Icon } from '@cseitz/fontawesome-react';
// import { Number0Icon } from '@cseitz/fontawesome-react'
// import { Number0Icon } from '@cseitz/fontawesome-react/0';

export default function Homepage() {
    const fiber = useFiber();
    const [count1, setCount1] = counter();
    const [count, setCount] = useState(123);
    const omg = useCallback(() => { }, [])
    const stuff = useHookState();
    const [count2, setCount2] = counter();
    // @ts-ignore
    // console.log(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
    // console.log(fiber);

    // console.log({ count1, count2 })

    return <div onClick={() => setCount2(count2 + 1)}>
        heya
        <Button leftIcon={<GithubIcon sx={{ height: '1em' }} />}>button</Button>
        <PlusIcon style='regular' />
        <UserPlusIcon style='regular' />
        <GithubIcon sx={{ height: '1em' }} />
        <HouseIcon />
    </div>
}

/**
 * Objectives:
 * 1. create a wrapper around a hook
 * 2. make that hook run once per render
 * 3. allow that data to be accessed multiple times
 * 
 * example:
 * - useCounter() returns getter and setter
 * - You can run useCounter() anywhere in the current thread and it'll track state
 */


// import { Envzo } from 'envzo';

// export const envzo = new Envzo({
//     validators: {
//         powerOf: Envzo.makeValidator<number, { power: number }>(({ input, errors, parse, options }) => {
//             // Use the `number` validator to parse into a number
//             const num = parse.number(input);
//             const p = Math.log10(num) / Math.log10(options.power);
//             if (p - Math.floor(p) === 0) {
//                 // not a power of `options.power`!
//                 throw errors.invalid('Power of Two', input);
//             }
//             return num;
//         })
//     }
// });

// const env = envzo.parse(process.env, v => ({
//     num: v.powerOf({ key: 'NUMBER', power: 3 })
// }))

// // num is a power of three
// const { num } = env;


// envzo.parse()