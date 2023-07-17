console.log("olá, Mundo");
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
  const numeroAleatorioEntreZeroEDez = getRndInteger(0, 5)
  console.log(numeroAleatorioEntreZeroEDez)