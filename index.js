//Máscara para dinheiro - respsota do stack OverFlow
String.prototype.reverse = function(){
    return this.split('').reverse().join(''); 
  };
  
  function mascaraMoeda(campo){
    var valor  =  campo.value.replace(/[^\d]+/gi,'').reverse();
    var resultado  = "";
    var mascara = "##.###.###,##".reverse();
    for (var x=0, y=0; x<mascara.length && y<valor.length;) {
      if (mascara.charAt(x) != '#') {
        resultado += mascara.charAt(x);
        x++;
      } else {
        resultado += valor.charAt(y);
        y++;
        x++;
      }
    }
    campo.value = resultado.reverse();
  }

// Menu

let icon = document.querySelector('svg');
let menu = document.querySelector('.menu');

document.querySelector('.bankMenu').addEventListener('click', ()=>{
    icon.classList.toggle('svgFlip');
    menu.classList.toggle('displayNone');
})

// Variaveis
let portionAmount = document.getElementById('portionAmount');
let totalInstallments = document.getElementById('totalInstallments');
let paidInstallments = document.getElementById('paidInstallments');

let portionAmountvalue;
let totalInstallmentsValue;
let paidInstallmentsValue;

let remainderToPay = document.getElementById('remainderToPay');

// Atualização do display
// Verificando se o usuário preencheu corretamente antes de continuar
function securityVerification(element) {
    element.addEventListener('change', ()=>{
        if (portionAmount.value === 0 || portionAmount.value === '') {
            element.value = '';
            return  alert('Adicione o valor da parcela');
        };
        if (element === paidInstallments) {
            if (totalInstallments.value === '' || totalInstallments.value === 0) {
                element.value = '';
                return alert('Adicione a quantidade de parcelas');
            };
        };
    });
};

securityVerification(totalInstallments);
securityVerification(paidInstallments);

// Calculo e retorno para o user do saldo devedor total

let mainInputs = [portionAmount, totalInstallments, paidInstallments];

function formataDinheiro(e) {
    return "R$ " + e.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    }

function storingInstallmentValue() {
    portionAmountvalue = portionAmount.value;
    portionAmountvalue = portionAmountvalue.replaceAll('.','').replace(',','.');
    portionAmountvalue = parseFloat(portionAmountvalue);
}

function calcDebtFinal() {
    storingInstallmentValue();
    installmentsFinalValue =  totalInstallmentsValue - paidInstallmentsValue;
    debtFinal = installmentsFinalValue * portionAmountvalue;
    return isNaN(debtFinal) ? '0.00': debtFinal;
};

mainInputs.forEach(e => {
    e.addEventListener('keyup', ()=> {
        storingInstallmentValue();
        portionAmountvalue = portionAmount.value;
        totalInstallmentsValue = totalInstallments.value;
        paidInstallmentsValue = paidInstallments.value;
        let calcResult = parseFloat(calcDebtFinal());
        remainderToPay.innerHTML = formataDinheiro(calcResult);;
    });

    e.addEventListener('click', ()=> {
        totalInstallmentsValue = totalInstallments.value;
        paidInstallmentsValue = paidInstallments.value;
        let calcResult = parseFloat(calcDebtFinal());
        remainderToPay.innerHTML = formataDinheiro(calcResult);;
    });
});

// Bancos

const bancos = [
    {
        banco: 'Hyundai',
        taxa: 50
    },
    {
        banco: 'PSA',
        taxa: 70
    },
    {
        banco: 'Toyota',
        taxa: 50
    },
    {
        banco: 'Honda',
        taxa: 50
    },
    {
        banco: 'Santander',
        taxa: 80
    },
    {
        banco: 'Yamaha',
        taxa: 50
    },
    {
        banco: 'BV Financeira',
        taxa: 80
    },
    {
        banco: 'Itaú',
        taxa: 80
    },
    {
        banco: 'Bradesco',
        taxa: 80
    },
    {
        banco: 'Pan',
        taxa: 80
    },
    {
        banco: 'Cred Fibra',
        taxa: 50
    },
    {
        banco: 'Cifra',
        taxa: 50
    },
    {
        banco: 'Santana',
        taxa: 50
    },
    {
        banco: 'Safra',
        taxa: 50
    },
    {
        banco: 'Ford',
        taxa: 50
    },
    {
        banco: 'VolksWagen',
        taxa: 60
    },
    {
        banco: 'Gmac',
        taxa: 50
    },
    {
        banco: 'Peugeot',
        taxa: 60
    },
    {
        banco: 'Daycoval',
        taxa: 60
    },
    {
        banco: 'Omini',
        taxa: 50
    },
    {
        banco: 'Banco Renault',
        taxa: 50
    },
    {
        banco: 'Brasil',
        taxa: 90
    },
    {
        banco: 'Panamericano',
        taxa: 80
    },
    {
        banco: 'Banco do Brasil',
        taxa: 80
    },
    {
        banco: 'RCI Brasil',
        taxa: 80
    },
    {
        banco: 'Caixa',
        taxa: 80
    },
    {
        banco: 'BV Votorantim',
        taxa: 80
    },
    {
        banco: 'Nubank',
        taxa: 70
    },
    {
        banco: 'Citibank',
        taxa: 70
    }
]

function addBank(bankName) {
    let menuItem = document.createElement('p');
    menuItem.classList.add('menuItem');
    menuItem.innerHTML = bankName;
    menu.appendChild(menuItem);
}

const bancoAlphaOrder =   bancos.sort((a, b)=> {
                            if(a.banco < b.banco) {
                            return -1;
                            } else {
                                return true;
                            };
                        });

bancoAlphaOrder.map((e)=> {
    addBank(e.banco);
});

menu.addEventListener('click', (e)=> {
    let bankTarget = bancos.find((objeto)=> objeto.banco == e.target.innerHTML);
    let bankRate = bankTarget.taxa;
    if (portionAmount.value === 0 || portionAmount.value === '') {
        return alert('Adicione o valor da parcela e a quantidade total de parcelas');
    } else {
        document.getElementById('percent').innerHTML = bankRate + ' %';
        document.getElementById('bankInputName').innerHTML = bankTarget.banco;
        let remainderToPayValue = remainderToPay.innerText.replace('R$','');
        remainderToPayValue = (parseFloat(remainderToPayValue.replaceAll('.','').replace(',','.')));
        let cjDiscount = remainderToPayValue - (remainderToPayValue * bankRate / 100);
        document.getElementById('whatWeGot').innerHTML = formataDinheiro(cjDiscount);
    };
});


