import TransactionModel from '../models/TransactionModel.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const create = async (req, res) => {
  try {
    const transaction = new TransactionModel(req.body);

    await transaction.save();

    res.send(transaction);
  } catch (error) {
    res.status(500).send(error || 'Algum erro ocorreu ao salvar');
  }
};

const findAll = async (req, res) => {
  const category = req.query.category;

  //condicao para o filtro no findAll
  var condition = category
    ? { category: { $regex: new RegExp(category), $options: 'i' } }
    : {};

  try {
    const alltransactions = await TransactionModel.find(condition);
    res.send(alltransactions);
  } catch (error) {
    res.status(500).send(error || 'Erro ao listar todos os documentos');
  }
};

const findTP = async (req, res) => {
  if (
    !req.query.period ||
    req.query.period.length != 7 ||
    req.query.period[4] != '-'
  ) {
    return res.status(400).send({
      message:
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
    });
  }

  const period = req.query.period;

  try {
    const yMTransactions = await TransactionModel.find({ yearMonth: period });
    res.send(yMTransactions);
  } catch (error) {
    res.status(500).send(error || 'Erro ao listar os documentos');
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findOne({ _id: id });
    res.send(transaction);
  } catch (error) {
    res.status(500).send('Erro ao buscar o transaction id: ' + id);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao não encontrados',
    });
  }

  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.send(transaction);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a transaction id: ' + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findByIdAndDelete({ _id: id });

    if (!transaction) {
      res.status(404).send('Documento nao encontrado na colecao');
    } else {
      res.status(200).send('transaction excluida com sucesso!');
    }
  } catch (error) {
    res.status(500).send('Nao foi possivel deletar o transaction id: ' + id);
  }
};

const removeAll = async (req, res) => {
  try {
    await TransactionModel.deleteMany({});
    res.status(200).send('Todas as transaction foram excluidas com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao excluir todos as transaction');
  }
};

export default { create, findAll, findTP, findOne, update, remove, removeAll };
