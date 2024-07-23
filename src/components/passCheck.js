export default function PassCheck(props){

    return (
        <div className="rounded-sm mt-10 m-4 p-6 px-10 w-fit ml-auto mr-auto bg-[#363735]">
            <div className="text-xl font-bold">Password Protected </div>
            <form className="text-sm mt-2">
                <div>
                <label className="outlin w-[70px] inline-block text-sm">
                        Password
                    </label>
                    <input ref={props.passRef} className="rounded-sm text-sm py-2 px-2 bg-inherit outline-none border-[.1px] border-[#646464]" required type="password"/>
                </div>
                <div className="flex justify-end mt-2">
                    <button type="submit" className="font-bold bg-green-600 rounded-sm text-sm py-2 px-2 outline-none" onClick={props.handleSubmit}>
                            Unlock
                    </button>
                </div>
            </form>
        </div>
    )
}