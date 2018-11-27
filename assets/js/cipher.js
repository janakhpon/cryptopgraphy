// Hide a secret!
function caesar(solve = false, word, shift = 100, alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!" ) {
	let hidden = '';
	let wordArr = [...word];
	shift = parseInt(shift);
	if ( typeof word !== 'string' || word.constructor !== String ) return false; // pass string only
	
	// loop over letters in word and replace with a new letter (not random, but staggered)
	wordArr.forEach( (letter, index) => { 
		if ( letter === ' ' ) { hidden += ' '; return; } // don't change spaces
		if ( !letter.match(/[a-z]/i)) { hidden += letter; return; } // ignore symbols/numbers
		let newLoc;
		let loc = alpha.indexOf(letter);		
		// if solving, need to go backwards
		if ( solve === true ) {
			newLoc = ( loc - shift ) % alpha.length;
			// wrapping back around
			if ( newLoc < 0 ) {
					newLoc = alpha.length + newLoc;
			}
		}
		else {
			// simpler when we are obfuscating it!
			newLoc = ( loc + shift ) % alpha.length;
		}		
		hidden += alpha[newLoc]; // build up result
	});
	return hidden;
}

// Get the obfuscated word...
const guessingSecret = caesar(false, 'Hello!', 15);
console.warn( `SECRET HIDDEN: ${guessingSecret}` );

// Reveal the secret!
const finalResult = caesar(true, guessingSecret, 15);
console.error( `SECRET DECODED: ${finalResult}` );

/* Note
The 'shift' values must be the same for this to work - this is the key value which you will have shared with your co-conspirator! 
You could attempt to brute-force this by looping the function X times where X is the shift value, similar to attacking a password hash.
*/


// only allow letters to be entered into the source
document.querySelector("#source-string").addEventListener('keypress', function(event) {
		var inputValue = event.which;
		// allow letters and whitespaces only.
		if(!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)) { 
				event.preventDefault(); 
		}
});

// Vue Stuff
Vue.component('caesar-cipher', {
  data() {
    return {
			toggle : false,
			shift : 15,
			possible : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!',
			currentDecoded : 'hello',
			currentEncoded : 'WTAAD'
    }
  },
	methods : {
		checkboxToggle() {
			this.toggle = !this.toggle;
			document.querySelector('#encode-cmd').value = this.currentEncoded;
			this.encoder(null);
		},
		encoder(event) {
			if ( this.toggle ) {
				if ( event ) {
					value = event.target.value;
				}
				else {
					value = document.querySelector('#encode-cmd').value;
				}
				this.currentEncoded = caesar(true, value, this.shift, this.possible);		
			}
			else {
				if ( event ) {
					value = event.target.value;
				}
				else {
					value = document.querySelector('#encode-cmd').value;
				}
				this.currentEncoded = caesar(false, value, this.shift, this.possible);	
			}
		}
	},
	computed : {
		status : function() {
			if ( this.toggle ) {
					return 'Decode';
			}
			else {
					return 'Encode';
			}
		}
	}
});
new Vue({
		el: '#app'
});

