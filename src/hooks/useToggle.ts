import {useState} from 'react'

function useToggle() {
    const [toggle, setToggle] = useState(false)

    function toggleItem() {
        setToggle((value) => !value)
    }

    return {toggle, toggleItem}
}

export default useToggle;