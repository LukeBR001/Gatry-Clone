import { useRef } from 'react'

export default function useDebouncePromise (fn, delay){
    let timeoutRef = useRef(null);     // Como se fosse o State, mas é utilizado para guardar coisas que não impactam tanto na View

    function handler (...params) {
        return new Promise((resolve, reject) => {
            if (timeoutRef.current) { // ref fica armazenado no current por padrao
                clearTimeout(timeoutRef.current)
            }
            
            timeoutRef.current = window.setTimeout(async () => {
                try {
                    const response = await fn(...params)
                    resolve(response) 
                } catch (e){
                    reject(e);
                }
            }, delay);
        })
    }
    return handler;
}