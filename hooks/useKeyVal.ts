import { combine, createEvent, createStore, Event, Store } from "effector"
import { useEvent, useStoreMap } from "effector-react"
import { useCallback } from "react"

const get = (kv: any, key: string, defaultValue = null) => {
    if (key in kv) return kv[key]
    return defaultValue
}

export function createKV<T>() {
    const keyval = createStore<Record<string, T>>({})
    const set = createEvent<{ key: string; value: T }>()
    const remove = createEvent<string>()

    keyval.on(set, (kv, { key, value }) => {
        if (kv[key] === value) return kv
        return { ...kv, [key]: value }
    })
    keyval.on(remove, (kv, key) => {
        if (key in kv) {
            kv = { ...kv }
            delete kv[key]
        }
        return kv
    })
    const keys = createStore([], {
        updateFilter(keys, oldKeys) {
            if (keys.length !== oldKeys.length) return true
            return keys.some((key, i) => oldKeys[i] !== key)
        },
    })
    keys.on(keyval, (_, kv) => Object.keys(kv))
    return {
        set,
        remove,
        keyval,
        keys,
    }
}

export const useKeyVal = (kv, key, initial) => {
    const value = useStoreMap({
        store: kv.keyval,
        fn: (kv) => get(kv, key, initial),
        keys: [key],
    })
    const [setEvt, removeEvt] = useEvent([kv.set, kv.remove])
    const update = useCallback((value) => setEvt({ key, value }), [kv, key])
    const remove = useCallback(() => removeEvt(key), [kv, key])
    return [value, update, remove]
}
