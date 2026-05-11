// Pega os elementos da páginas pelo ID
 const campoBusca = document.getElementById('campoBusca');
 const btnBuscar = document.getElementById('btnBuscar');
 const resultado = document.getElementById('resultado');
 const msgErro = document.getElementById('msgErro');

 // Função principal: busca o pokemon do APi
 async function buscarPokemon () {
    const nome = campoBusca.Value.toLowerCase().trim();
    
    if (nome === ""){
        alert("Digite o nome de um Pokemon");
        return;
    }

    try {
        // faz a requisição para o pokeAPI
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
        
        // se o pokemon não existe, lança o erro
        if(!resposta.ok) throw new Error('Não encontrado');
        // converte a resposta para JSON
        const dados = await resposta.json();  

        //preencha os campos com os dados do html
        document.getElementById('pokeNome').textContent = dados.name;
        document.getElementById('pokeID').textContent = dados.id;
        document.getElementById('pokeAltura').textContent = dados.height;
        document.getElementById('pokePeso').textContent = dados.weight;
        document.getElementById('pokeTipo').textContent = dados.types [0]. type.name;
        document.getElementById('pokeImg').src = dados.sprites.front_default;

        // mostra o card e esconde o erro 
        resultado.classList.remove('escondido');
        msgErro.classList.add('escondido');

    }catch (erro){
     //esconde o card e mostra o erro
     resultado.classList.add('escondido');
     msgErro.classList.remove('escondido')
    }
   }


    //Dispara a busca ao clicar no botão
    btnBuscar.addEventListener('click', buscarPokemon);

    //Dispara a busca ao pressionar Enter no campo
    campoBusca.addEventListener ('keypress', (e) => {
        if (e.key === 'Enter') buscarPokemon();
    });
 