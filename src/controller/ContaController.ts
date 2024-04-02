import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";

export class ContaController implements ContaRepository{
    
    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);
        if (buscaConta !== null)
            buscaConta.visualizar();
        else
            console.log("\nConta não foi Encontrada!\n");
    }

    procurarPorTitular(titular: string) {
        let listaContasPorTitular = this.listaContas.filter(c => 
            c.titular.toUpperCase().includes(titular.toUpperCase()));
        for(let conta of listaContasPorTitular){
            conta.visualizar();
        }
    }
    
    listarTodas(): void {
        for (let conta of this.listaContas){
            conta.visualizar();
        }
    }
    
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log("A Conta foi adicionada!\n");
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);
        if (buscaConta !== null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(`\nA Conta Número ${conta.numero} foi Atualizado com Êxito\n`);
    
        }else
            console.log("\nConta não foi Encontrada!\n");
    }
    
    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);
        if (buscaConta !== null){
            this.listaContas.splice(this.listaContas.indexOf(buscaConta, 1));
            console.log(`\nA Conta Número ${numero} foi Excluída com Êxito\n`);
    
        }else
            console.log("\nConta não foi Encontrada!\n");
    }
    
    sacar(numero: number, valor: number): void {
        let buscaConta = this.buscarNoArray(numero);
        if (buscaConta !== null){
            if (buscaConta.sacar(valor) === true) {
                console.log(`\nO Saque na Conta Número ${numero} foi Efetuado com Êxito\n`);
            }
        } else
            console.log("\nConta não foi Encontrada!\n");
    }
    
    depositar(numero: number, valor: number): void {
        let buscaConta = this.buscarNoArray(numero);
        if (buscaConta !== null){
            buscaConta.depositar(valor)
            console.log(`\nO Depósito na Conta Número ${numero} foi Efetuado com Êxito\n`);
        }else
            console.log("\nConta não foi Encontrada!\n");
    }
    
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);

        if (contaOrigem !== null && contaDestino !== null){
            if (contaOrigem.sacar(valor) === true) {
                contaDestino.depositar(valor);
                console.log(`\nA Transferência na Conta Número ${numeroOrigem} para a Conta Número ${numeroDestino} foi Efetuado com Êxito\n`);
            }
        } else
            console.log("\nConta de Origem e/ou a Conta de Destino não foi Encontrada!\n");
    }
    
    public gerarNumero(): number{
        return ++ this.numero;
    }

    public buscarNoArray(numero: number): Conta | null{
        for (let conta of this.listaContas){
            if (conta.numero === numero) {
                return conta;
            }
        }
        return null;
    }
}
