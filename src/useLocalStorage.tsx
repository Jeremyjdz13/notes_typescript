import { useEffect, useState } from 'react'
// Passing a generic type T so we type useLocalStorage as generic type T and we are passing a key type string and initial value type generic value type T or a function (useState) () => T
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    //Does the value exits yet?
    const [value, setValue ] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue === null) {
            if (typeof initialValue === "function") {
                return (initialValue as () => T)()
            } else {
                return initialValue
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })
    //Update when the value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [T, typeof setValue]
}