const {listarAulas, atualizarAulas} = require('')

function pegarTodasAsAulas(req, res) {
    lerBancoDeDados((err, dados) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        res.status(200).send(dados);
    });
};

module.exports = {pegarTodasAsAulass}

function procurarAulas (req, res) {
    const id = req.params.id;
    lerBancoDeDados((err, aulas) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const aula = aulas.find(aula => aula.id == id);
        if (aula) {
            return res.status(200).json(aula);
        }
        return res.status(404).json({ msg: "Aula não encontrada" });
    });
};

module.exports = {procurarAulas}

function atualizarAulas (req, res) {
    const dados = req.body;

    if (!dados || typeof dados !== 'object') {
        return res.status(400).json({ msg: "Corpo da requisição inválido ou ausente." });
    }

    lerBancoDeDados((err, aulas) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }

        dados['id'] = uuidv4();
        aulas.push(dados);

        escreverBancoDeDados(aulas, (err) => {
            if (err) {
                return res.status(500).json({ msg: "Erro ao salvar dados" });
            }
            res.status(201).json(dados);
        });
    });
};

module.exports = {atualizarAulasAulas}

function criarAulas (req, res) {
    const id = req.params.id;
    lerBancoDeDados((err, aulas) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const aulaIndex = aulas.findIndex(aula => aula.id == id);
        if (aulaIndex === -1) {
            return res.status(404).json({ msg: "Aula não encontrada" });
        }

        aulas[aulaIndex] = { ...aulas[aulaIndex], ...req.body };

        escreverBancoDeDados(aulas, (err) => {
            if (err) {
                return res.status(500).json({ msg: "Erro ao salvar dados" });
            }
            res.status(200).json(aulas[aulaIndex]);
        });
    });
};

module.exports = {criarAulasAulas}

function deletarAulas (req, res) {
    const id = req.params.id;
    lerBancoDeDados((err, aulas) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const aulaIndex = aulas.findIndex(aula => aula.id == id);
        if (aulaIndex === -1) {
            return res.status(404).json({ msg: "Aula não encontrada" });
        }

        aulas.splice(aulaIndex, 1);

        escreverBancoDeDados(aulas, (err) => {
            if (err) {
                return res.status(500).json({ msg: "Erro ao salvar dados" });
            }
            res.status(204).send();
        });
    });
};

module.exports = {deletarAulas}