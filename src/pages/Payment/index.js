import React, { useState, useRef, useEffect } from 'react';
import './payment.scss'

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BsFillCreditCardFill, BsFillPersonPlusFill } from 'react-icons/bs';
import { FaClipboardUser } from 'react-icons/fa6';

export default function PagamentoOnlineAnual() {

    // useEffect(() => {
    //     document.title = "Jesustyle | Finalizar Compra"
    //   }, [])
    

    const url = 'Pagamento/ComprarCursoOnline2'

    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip_code, setZip_code] = useState('');
    const [line_1, setLine_1] = useState('');
    const [line_2, setLine_2] = useState('');
    const [numerocasa, setNumerocasa] = useState('');
    const [area_code, setArea_code] = useState('');
    const [number, setNumber] = useState('');
    const [numero, setNumero] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [document, setDocument] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [numberCard, setNumberCard] = useState('');
    const [expdate, setExpdate] = useState('');
    const [cvv, setCvv] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [isCPFValid, setIsCPFValid] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [preco, setPreco] = useState(597.0);
    const [parcelas, setParcelas] = useState(10);
    const [cupom, setCupom] = useState('');
    const [botaoTexto, setBotaoTexto] = useState('Validar');
    const [botaoCor, setBotaoCor] = useState('');
    const [valorDesconto, setValorDesconto] = useState(0);

    const ref = useRef(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        const newValue = selectedValue.replace(/[^0-9\-]/g, '');
        setZip_code(newValue);
    };
    const handleChange2 = (event) => {
        const input = event.target.value;
        const newValue = input.replace(/[^0-9\-]/g, '');

        const areacode = newValue.slice(0, 2);
        setArea_code(areacode);

        const numbero = newValue.slice(-9);
        setNumber(numbero);

        setNumero(formatarNumeroTelefone(newValue));
    };
    const formatarNumeroTelefone = (numero) => {
        const numeros = numero.replace(/\D/g, '');

        const regexTelefone = /^(\d{2})(\d{5})(\d{4})$/;
        const numeroFormatado = numeros.replace(regexTelefone, '($1)$2-$3');

        return numeroFormatado;
    }
    const handleChange5 = (event) => {
        const selectedValue = event.target.value;
        setNumberCard(selectedValue);
    }
    const handleChange6 = (event) => {
        const selectedValue = event.target.value;
        let data = ''
        if (selectedValue[2] != null) {
            const array = selectedValue.split("")
            array.map((map, i) => {
                if (i == 2 && selectedValue[2] != '/')
                    data += '/'
                data += map
            })

            setExpdate(data);
        }
        else {
            setExpdate(selectedValue);
        }
    }
    const handleChange7 = (event) => {
        const selectedValue = event.target.value;
        setCvv(selectedValue);
    }
    const handleChange10 = (event) => {
        const selectedValue = event.target.value;
        setNumerocasa(selectedValue);
    }
    const handleChange11 = (event) => {
        const selectedValue = event.target.value;

        setDocument(formatarCPF(selectedValue));
        setIsCPFValid(validarCPF(selectedValue));
    }
    const formatarCPF = (cpf) => {
        const numeros = cpf.replace(/\D/g, '');

        const regexCPF = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
        const cpfFormatado = numeros.replace(regexCPF, '$1.$2.$3-$4');

        return cpfFormatado;
    };
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11) {
            return false;
        }
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let rest = sum % 11;
        let digit1 = (rest < 2) ? 0 : 11 - rest;
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        rest = sum % 11;
        let digit2 = (rest < 2) ? 0 : 11 - rest;
        if (parseInt(cpf.charAt(9)) !== digit1 || parseInt(cpf.charAt(10)) !== digit2) {
            return false;
        }
        return true;
    }
    const handleChange12 = (event) => {
        const selectedValue = event.target.value;
        setEmail(selectedValue);
    }
    const handleChange14 = (event) => {
        const selectedValue = event.target.value;
        const resultado = selectedValue.replace(/[^\p{L}\s]/gu, '');

        setName(resultado);
    }
    const handleChange15 = (event) => {
        const selectedValue = event.target.value;
        setType(selectedValue);
    }
    const handleChange16 = (event) => {
        const selectedValue = event.target.value;
        //console.log(selectedValue)
        setPassword(selectedValue);
    }
    const handleChange18 = (event) => {
        const selectedValue = event.target.value;
        //console.log(selectedValue)
        setConfPassword(selectedValue);
    }
    const handleChangeParcelas = (event) => {
        setParcelas(parseInt(event.target.value));
    };
    const handleChangeCupom = (event) => {
        const selectedValue = event.target.value;
        setCupom(selectedValue);
    };
    const handleBotaoClick = () => {
        if (botaoTexto === 'Validar') {
            cupomValidation();
        } else if (botaoTexto === 'Remover') {
            setCupom('');
            setBotaoTexto('Validar');
            setBotaoCor('');
            setPreco(597.0);
            setValorDesconto(0);
        }
    };
    const cupomValidation = async () => {
        if (!cupom) {
            alert('Por favor, insira um cupom.');
            return;
        }

        try {
            //const response = await api.get('https://api.varsolutions.com.br/webapivar/Pagamento/ObterCupom/' + cupom);
            //const data = response.data;

            // if (response.status === 200) {
            //     if (data.status === 'success') {
            //         const couponInfo = data.cupom;
            //         const desconto = (couponInfo.valorCupomPorcento / 100) * preco;
            //         const novoPreco = preco - desconto;
            //         setPreco(novoPreco);
            //         setValorDesconto(desconto);
            //         setBotaoTexto('Remover');
            //         setBotaoCor('red');
            //     } else if (data.status === 'expired') {
            //         alert('O cupom inserido está expirado.');
            //     } else {
            //       alert("O cupom inserido não é válido.");
            //     }
            // }
        } catch (error) {
          alert('Ocorreu um erro ao verificar o cupom.');
        }
    };
    const botaoClassName = botaoCor === 'red' ? 'botao-remover' : '';

    const cep = async () => {
        if (zip_code == '')
            return;
        try {
            const response = await fetch("https://viacep.com.br/ws/" + zip_code + "/json/");
            const data = await response.json();

            if ("erro" in data) {
                alert("CEP não existe")
                return;
            }

            setLine_1(data.logradouro)
            setCity(data.localidade)
            setState(data.uf)

            return data;
        }
        catch (error) {
            setLine_1("")
            setCity("")
            setState("")
            alert("O campo 'CEP' não está definido de forma correta.");
            return;
        }

    }

    const validarCartaoCredito = (numeroCartao) => {
        const digitos = numeroCartao.replace(/\s/g, '').split('').map(Number);

        if (digitos.length < 2) {
            return false;
        }
        digitos.reverse();
        let soma = 0;
        for (let i = 0; i < digitos.length; i++) {
            let digito = digitos[i];

            if (i % 2 !== 0) {
                digito *= 2;

                if (digito > 9) {
                    digito -= 9;
                }
            }

            soma += digito;
        }

        return soma % 10 === 0;
    }

    const validacep = async (cep) => {
        if (cep == '')
            return false;
        try {
            const response = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
            const data = await response.json();

            if ("erro" in data) {
                alert("CEP não existe")
                return false;
            }

            setLine_1(data.logradouro)
            setCity(data.localidade)
            setState(data.uf)

            return true;
        }
        catch (error) {
            setLine_1("")
            setCity("")
            setState("")
            alert("O campo 'CEP' não está definido de forma correta.");
            return false;
        }

    }

    const validarEmail = (email) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    const handleComprar = async () => {
        try {
            if (name == '') {
                alert("Preencha o campo nome no cartão.");
                return;
            }
            if (numberCard == '') {
                alert("Preencha o campo número do cartão.");
                return;
            }
            if (expdate == '') {
                alert("Preencha o campo data de validade.");
                return;
            }
            if (cvv == '') {
                alert("Preencha o campo CVV.");
                return;
            }
            if (document == 0) {
                alert("Preencha o campo CPF.");
                return;
            }
            if (type == 0 || type === "Selecione uma opção") {
                alert("Selecione o campo tipo de pessoa.");
                return;
            }
            if (email == '') {
                alert("Preencha o campo e-mail.");
                return;
            }
            if (number == 0) {
                alert("Preencha o campo telefone.");
                return;
            }
            if (zip_code == '') {
                alert("Preencha o campo CEP.");
                return;
            }
            if (numerocasa == '') {
                alert("Preencha o campo de número residencial.");
                return;
            }
            if (!validarCartaoCredito(numberCard)) {
                alert("Cartão inválido.");
                return;
            }
            if (parseInt(expdate.split("/")[0]) > 12) {
                alert("O mês da data de validade do cartão é inválida.")
                return;
            }
            if (parseInt("20" + expdate.split("/")[1].toString()) < new Date().getFullYear()) {
                alert("O ano da data de validade do cartão é inválida.")
                return;
            }
            if (cvv.length != 3) {
                alert("O CVV do cartão é inválido.")
                return;
            }
            if (password == '') {
                alert("Preencha o campo de senha.");
                return;
            }
            if (confPassword == '') {
                alert("Preencha o campo confirmar senha.");
                return;
            }
            if (!validacep(zip_code)) {
                return;
            }
            if (!validarCPF(document)) {
                alert("CPF inválido.");
                return;
            }
            if (numero.length < 14) {
                alert("Número de telefone inválido, verifique o número e o DDD.")
                return;
            }
            if (!validarEmail(email)) {
                alert("E-mail inválido.")
                return;
            }
            if (password !== confPassword) {
                alert("As senhas não coincidem.")
                return;
            }
            if (!isCheckboxChecked) {
                alert("Você deve concordar com os termos para continuar.");
                return;
            }

            setLoadingAuth(true);

            // const data = {
            //     customer_address_state: state,
            //     customer_address_city: city,
            //     customer_address_zip_code: zip_code,
            //     customer_address_line_1: line_1,
            //     customer_address_line_2: numerocasa,
            //     customer_phones_mobile_phone_area_code: area_code,
            //     customer_phones_mobile_phone_number: number,
            //     customer_name: name,
            //     customer_type: type,
            //     customer_email: email,
            //     customer_document: (document.replace(".", "").replace("-", "").replace(".", "")),
            //     //customer_gender: gender,
            //     //  customer_birthdate: handleparseDate(birthdate),
            //     payments_credit_card_card_number: numberCard,
            //     payments_credit_card_card_holder_name: name,
            //     payments_credit_card_card_exp_month: expdate.split("/")[0],
            //     payments_credit_card_card_exp_year: expdate.split("/")[1],
            //     payments_credit_card_card_cvv: cvv,
            //     cupom: cupom,
            //     password: password
            // };



            // const params = new URLSearchParams();

            // for (const key in data) {
            //     if (data.hasOwnProperty(key)) {
            //         params.append(key, data[key]);
            //     }
            // }
            // try {
            //     await api.post(url + "/" + parcelas, params,
            //         {
            //             headers: { 'content-type': 'application/x-www-form-urlencoded' }
            //         }).then((response) => {
            //             if (response.status == 200) {
            //                 setArea_code('')
            //                 setBirthdate('')
            //                 setCity('')
            //                 setCvv('')
            //                 setDocument('')
            //                 setEmail('')
            //                 setExpdate('')
            //                 setLine_1('')
            //                 setLine_2('')
            //                 setName('')
            //                 setNumber('')
            //                 setNumberCard('')
            //                 setNumero('')
            //                 setNumerocasa('')
            //                 setState('')
            //                 setType('')
            //                 setZip_code('')
            //             }

            //             //console.log(response)

            //             api.defaults.headers.authorization = `Bearer ${response.data.token}`;
            //             window.localStorage.setItem('usr_token', response.data.token);
            //             window.localStorage.setItem('usr_id', response.data.usuarioid);
            //             window.localStorage.setItem('usr_status', response.data.status);
            //             window.localStorage.setItem('usr_nome', response.data.nome);
            //             const foto = response.data.urlFoto == null ? "avatar.png" : response.data.urlFoto
            //             window.localStorage.setItem('usr_foto', "https://api.varsolutions.com.br/images/image_Aluno/" + foto);
            //             ref.current.click()
            //         })
            // }
            // catch (error) {
            //     if (error.response.data.mensagem === "Este Email já existe")
            //         alert("Este E-mail já está vinculado a uma conta")
            //     alert("Algo deu errado, por favor, contate o suporte.")
            // }
            // finally {
            //     setLoadingAuth(false);
            // }
        }
        catch (error) {
            alert("Algo deu errado, por favor, contate o suporte.")
        }
    }

    return (
        <div>
            <div className='body-pagamento-online'>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={`/planos/online/anual`}>Curso online</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Pagamento anual</li>
                    </ol>
                </nav>
                <div className='conteudo-pagamento'>
                    <section>
                        <h1>Finalizar compra</h1>
                        <div className='row formulario-pagamento'>
                            <section>
                                <h5><BsFillCreditCardFill />Dados do cartão</h5>
                                <span>Aceitamos somente cartão de crédito!*</span>
                            </section>
                            <div className='col-md-6'>
                                <label>Nome no cartão</label>
                                <input type="text" onChange={handleChange14} value={name} placeholder="Nome no cartão" />
                            </div>
                            <div className='col-md-6'>
                                <label>Número do Cartão</label>
                                <input type="text" onChange={handleChange5} value={numberCard} placeholder="Número do Cartão" />
                            </div>
                            <div className='col-md-4'>
                                <label>Data de Validade</label>
                                <input type="text" placeholder="MM/AA" value={expdate} onChange={handleChange6} maxlength="5" />
                            </div>
                            <div className='col-md-4'>
                                <label>CVV</label>
                                <input type="text" maxlength="3" value={cvv} onChange={handleChange7} placeholder="CVV" />
                            </div>
                            <div className='col-md-4'>
                                <label>Número de parcelas</label>
                                <select type='number' onChange={handleChangeParcelas}>
                                    <option value={10}>10 X de R${(preco / 10).toFixed(2).replace(".", ",")}</option>
                                    <option value={9}>9 X de R${(preco / 9).toFixed(2).replace(".", ",")}</option>
                                    <option value={8}>8 X de R${(preco / 8).toFixed(2).replace(".", ",")}</option>
                                    <option value={7}>7 X de R${(preco / 7).toFixed(2).replace(".", ",")}</option>
                                    <option value={6}>6 X de R${(preco / 6).toFixed(2).replace(".", ",")}</option>
                                    <option value={5}>5 X de R${(preco / 5).toFixed(2).replace(".", ",")}</option>
                                    <option value={4}>4 X de R${(preco / 4).toFixed(2).replace(".", ",")}</option>
                                    <option value={3}>3 X de R${(preco / 3).toFixed(2).replace(".", ",")}</option>
                                    <option value={2}>2 X de R${(preco / 2).toFixed(2).replace(".", ",")}</option>
                                    <option value={1}>1 X de R${(preco / 1).toFixed(2).replace(".", ",")}</option>
                                </select>
                            </div>
                            <section className='section2'>
                                <h5><BsFillPersonPlusFill />Dados complementares</h5>
                            </section>
                            <div className='col-md-6'>
                                <label>CPF</label>
                                <input type="text" placeholder="CPF" value={document} maxlength="14" onChange={handleChange11} />
                            </div>
                            <div className='col-md-6'>
                                <label>Tipo de Pessoa</label>
                                <select onChange={handleChange15} value={type}>
                                    <option>Selecione uma opção</option>
                                    <option value={"individual"}>Pessoa Física</option>
                                    <option value={"company"}>Pessoa Jurídica</option>
                                </select>
                            </div>
                            <div className='col-md-5'>
                                <label>Telefone</label>
                                <input type="tel" placeholder="(**) *****-****" value={numero} onChange={handleChange2} maxLength={14} />
                            </div>
                            <div className='col-md-4'>
                                <label>CEP</label>
                                <input type="text" placeholder="CEP" value={zip_code} maxLength={9} onChange={handleChange} onBlur={cep} />
                            </div>
                            <div className='col-md-3'>
                                <label>Nº residencial</label>
                                <input type="text" placeholder="Nº residencial" value={numerocasa} onChange={handleChange10} maxLength={9} />
                            </div>
                        </div>
                    </section>
                    <section className='section-detalhes'>
                        <h5>Detalhes da compra:</h5>
                        <p style={{ display: 'block', marginBottom: '2vh' }}>Curso: <span>Desenvolvimento de Software em C# e Java.</span></p>
                        <p>Preço: <span className='alinhamento-preco'>{valorDesconto > 0 && <span className='perc-desconto'>-R${valorDesconto.toFixed(2).replace(".", ",")}</span>}R${preco.toFixed(2).replace(".", ",")}</span></p>
                        <p className='parcela'>Quantidade de parcelas:
                            <span>{parcelas} X</span>
                        </p>
                        {/* <img src={seloPag} style={{ width: "65%", marginTop: "5%" }} /> */}
                        <p className='total-diviser'></p>
                        <p className='total'>Total:
                            <span>
                                <span>{parcelas} X de</span>
                                R${(preco / parcelas).toFixed(2).replace(".", ",")}
                            </span>
                        </p>
                        <div>
                            <label><input type='checkbox' onChange={(e) => setIsCheckboxChecked(e.target.checked)} />Ao marcar esta opção, você está concordando com estes <a href='https://instituto.varsolutions.com.br/termos/anual' target="_blank" rel="noreferrer">Termos de Serviço</a>.</label>
                        </div>
                        {<button className='botao-azul' onClick={handleComprar} disabled={loadingAuth}>
                            {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Finalizar compra"}
                        </button>}
                    </section>
                </div>
            </div>
        </div>
    )
}