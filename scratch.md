1. find words frequency
2. find frequncy with . , spaces
3. find the vocubalary

now i have find the most common pair. i
i am thinging maintain an object which holds the {'firstChar + secondChar' : times , ...}

i want to maintain the pair in the join format.

after finding the pair incs the times of the pair.

after that finds the most common pair. after that i have to merge the words. add the pair in the voculabry.

then i have to find the most common pair. continous until the vocubalary size exceeds the limit.

i am thinking my words structure in this.

const word = { symbols : ['h', 'e', 'l' 'lo'], freq : 10};

in the symbols assume the 'lo' has be pairedd.

words = word[];

my pair representaion

const pair = {firstSymbol : 'h', secondSymbol : 'g' , freq : 10}

pairs = pair[]

attetions mechanism :

1. we create input matrix : it is the adding of the embedding matrix (vectors) and position embedding
   input matrix = embedding + position embedding.

2. create random query weight, key weights, value weigths. (we need this matrix to multiple with the input and get the key, query, value).

key,queries , values are the learnable matrix .

key matrix = key weights _ input.
query matrix = query weight _ input.
value matrix = value weight \* input.

those are learning value some we can , assign all the key, query, value as the input. because all will become same. training will diffcult.

Scores
↓
divide by √dₖ
↓
Softmax
↓
Attention weights
↓
multiply by V
↓
Final attention output
