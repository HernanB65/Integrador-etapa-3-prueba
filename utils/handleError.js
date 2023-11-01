
const handleError = (res, mensaje = "Algo sucedió", codigo = 500) => {
    res
        .status(codigo)
        .res.json({ ok: false, error: mensaje})
}

export default handleError