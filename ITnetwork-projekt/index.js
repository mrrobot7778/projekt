class Evidence {

    constructor() {
     
      this.storageZaznamy = localStorage.getItem("pojištěnci");
      this.hlaska = document.getElementById("hlaska")
      this.tlacitko = document.getElementById("tlacitko");
      this.tabulka = document.getElementsByTagName("table");
      this.jmeno = document.getElementById("jmeno")
      this.prijmeni = document.getElementById("prijmeni")
      this.vek = document.getElementById("vek")
      this.telefon = document.getElementById("telefon")
      this.pojištěnec = {}
      this.polePojištěnců = this.storageZaznamy ? JSON.parse(this.storageZaznamy) : [];
      this.pojištěnci = []
      this.vlastnosti = ["jmeno","vek","telefon"]
      this.specialniZnaky = ["/","_","-","|","\\","*","+","~","!","?"]
      this.nastavUdalosti();
      this.vypisZeStorage();
      
    }
  
    nastavUdalosti() {
  
     this.tlacitko.addEventListener("click",(e) => {
  
        e.preventDefault();

        let celeJmeno = `${this.jmeno.value} ${this.prijmeni.value}`
        this.pojištěnec.jmeno = celeJmeno
        this.pojištěnec.vek = this.vek.value;
        this.pojištěnec.telefon = this.telefon.value;
        this.validujData(this.pojištěnec)
         
  
         if(this.jmeno.value && this.prijmeni.value && this.vek.value && this.telefon.value) {

  
             if(this.hlaska.textContent) {
  
               this.hlaska.textContent = "";
  
             }   
  
             this.uložPojištěnce(this.pojištěnec);
  
             let inputy = document.getElementsByTagName("input");
  
             for(let i=0;i<=inputy.length-1;i++) {
  
                 let input = inputy[i];
   
                 if(input.getAttribute("id") !== "tlacitko") 
  
                   input.value = "";
  
             }
  
  
         }
  
  
         else {
  
           this.hlaska.textContent = "Musíte vyplnit všechny pole !";
          
  
          }
  
      
        })
  
      } 
  
  
       uložPojištěnce(pojištěnec) {
        
         this.polePojištěnců.push(pojištěnec);
         console.log( this.polePojištěnců)
         let radek = document.createElement("tr");
         let tlacitko = document.createElement("button")
         tlacitko.innerText = "Smazat"
  
         for(let i=0;i<=3;i++) {
         
          let bunka = document.createElement("td");
          bunka.textContent = pojištěnec[this.vlastnosti[i]];

          if(i === 3){bunka.appendChild(tlacitko)}


          radek.appendChild(bunka);
          this.tabulka[0].appendChild(radek);

  
         }
         
         
         localStorage.setItem("pojištěnci",JSON.stringify(this.polePojištěnců))
         this.pojištěnec = {}
  
      }
  
     vypisZeStorage() {
  
  
         if(this.storageZaznamy) {
            
          let zaznamy = JSON.parse(this.storageZaznamy);
      
          console.log(this.storageZaznamy)
           for(let i=0;i<=zaznamy.length-1;i++) {
  
            let pojištěnec = zaznamy[i];
            let radek = document.createElement("tr")
            let tlacitko = document.createElement("button");
            tlacitko.innerText = "Smazat"
            
            for(let j=0;j<=3;j++) {
  
              let bunka = document.createElement("td")
              bunka.textContent = pojištěnec[this.vlastnosti[j]];

             if(j === 3) {bunka.appendChild(tlacitko)}

              radek.appendChild(bunka)
  
            }
            
            this.tabulka[0].appendChild(radek);
  
           }
   
        
        }
        
  
     }


     validujData(pojištěnec) {

      let hlaska;

      let validatorOsob = {
        set(obj, prop, value) {
            if (prop == "jmeno") {
                if (value.length <= 6)
                throw new Error("Jméno musí mít alespoň 4 znaky a obsahovat mezeru.");
                obj[prop] = value.toLowerCase().replace(/\b./g, (znak) => znak.toUpperCase() );
            } else if (prop == "heslo") {
               
               let specialniZnak = false;
                
               for(let i=0;i<=value.length-1;i++) {

                 

               }

            }
        },
    
        get(obj, prop) {
            
            return Reflect.get(...arguments);
        }

      }

      let validace = new Proxy(pojištěnec,validatorOsob)
      console.log(validace.jmeno)
    
    }



     vypisHlasku() {
 
      this.tlacitkoPojistence[0].addEventListener("click",() => {
      this.hlaska.style.display="block";
  
          setTimeout(() => {
            
            this.hlaska.style.display = "none"
  
          },6000)
  
  
      })    
  
    }

      
  }


  
   