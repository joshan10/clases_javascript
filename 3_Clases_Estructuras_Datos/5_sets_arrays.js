const s = new Set();
s.add(1); 
s.add(2); 
s.add(1);
s.add(3);
s.add("😂");
s.add("😂");
s.add(5);
s.add(5);
s.add(6);
console.log(s.size);

const a = [1, 2, 1, 3, 6, 6, "😂", 4, 1, 2];
a.push(45);
console.log(a.length);
console.log(a[6]);