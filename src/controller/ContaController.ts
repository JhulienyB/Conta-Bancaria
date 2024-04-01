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
            console.log("\nConta não foi Encontrada!");
    }
    
    listarTodas(): void {
        for (let conta of this.listaContas){
            conta.visualizar();
        }
    }
    
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log("A Conta foi adicionada!");
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);
        if (buscaConta !== null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(`\nA Conta Número ${conta.numero} foi Atualizado com Êxito`);
    
        }else
            console.log("\nConta não foi Encontrada!");
    }
    
    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);
        if (buscaConta !== null){
            this.listaContas.splice(this.listaContas.indexOf(buscaConta, 1));
            console.log(`\nA Conta Número ${numero} foi Excluída com Êxito`);
    
        }else
            console.log("\nConta não foi Encontrada!");
    }
    
    sacar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    
    depositar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        throw new Error("Method not implemented.");
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
