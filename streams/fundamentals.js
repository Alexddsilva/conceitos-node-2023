// Netflix & Spotify

// Importação clientes CSV (Excel)
// 1Gb - 1.000.000 linhas
// Post /upload import.csv

// 10mb/s - 100s

// 100s -> Começar as inserções no banco

// 10 mb/s -> 10.000 linhas ja poderiam ser inseridas

// Readable Streams / Writable Streams

// Streams ->

// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
	index = 1;
	_read() {
		const i = this.index++;

		setTimeout(() => {
			if (i > 100) {
				this.push(null);
			} else {
				const buf = Buffer.from(String(i));
				this.push(buf);
			}
		}, 100);
	}
}

class MultiplyByTenStream extends Writable {
	_write(chunk, encoding, callback) {
		console.log(Number(chunk.toString()) * 10);
		callback();
	}
}

class InverseNumberStream extends Transform {
	_transform(chunk, encoding, callback) {
		const transformed = Number(chunk.toString()) * -1;
		callback(null, Buffer.from(String(transformed)));
	}
}

new OneToHundredStream()
	.pipe(new InverseNumberStream())
	.pipe(new MultiplyByTenStream());
