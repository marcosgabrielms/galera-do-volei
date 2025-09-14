export interface Partida {
    id: string;
    data_hora: string;
    local: string;
    categoria: string;
    status: 'Agendada' | 'Em Andamento' | 'Finalizada';
    organizador_id: string;  
}

export interface Jogador {
    id: string;
    nome: string;
    sexo: string;
    categoria_idade: string;
}