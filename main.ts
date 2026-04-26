import { applyBPEAlogthim } from "./src/bpe.ts";
import { applyEmbedding } from "./src/embedding.ts";
import { Corpus } from "./src/types.ts";

const main= (corpus : Corpus) => {
  const {vocabulary, mergers, vocabularyMap} = applyBPEAlogthim(corpus);
  applyEmbedding(corpus, vocabulary, mergers, vocabularyMap)
}

const corpus = [
    "This is the Hugging Face Course.",
    "This chapter is about tokenization.",
    "This section shows several tokenizer algorithms.",
    "Hopefully, you will be able to understand how they are trained and generate tokens.",
];

// const corpus = [
//   "low",
//   "low",
//   "lower",
//   "new",
//   "newest",
//   "widest"
// ]

main(corpus)