function App() {
    return (
        <>
            <button onClick={async () => {
                const response = await fetch('/api')
                const parse = await response.json()
                console.log(parse);
            }}>
                Click Me
            </button>
        </>
    )
}

export default App
