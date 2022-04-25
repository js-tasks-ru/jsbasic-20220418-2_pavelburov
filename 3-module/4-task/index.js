function showSalary(users, maxAge) {
  return users
  .filter(({age}) => age <= maxAge )
  .map(({name, balance}) =>`${name}, ${balance}`)
  .join('\n')
}
