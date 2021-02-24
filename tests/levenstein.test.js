describe("levenshtein.Distance", () => {

  const collator = Intl.Collator("default", { usage: "sort", sensitivity: "base" })
  const levenshtein = require("../src/index.js")

  it('matches', () => {
    expect(levenshtein.Distance(collator.compare, "", "")).toBe(0)
    expect(levenshtein.Distance(collator.compare, "a", "a")).toBe(0)
    expect(levenshtein.Distance(collator.compare, "abc", "abc")).toBe(0)
  })

  it('side empty', () => {
    expect(levenshtein.Distance(collator.compare, "a", "")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "", "a")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "abc", "")).toBe(3)
    expect(levenshtein.Distance(collator.compare, "", "abc")).toBe(3)
  })

  it('insert', () => {
    expect(levenshtein.Distance(collator.compare, "a", "ab")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "b", "ba")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "ac", "abc")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "abcdefg", "xabxcdxxefxgx")).toBe(6)
  })

  it('delete', () => {
    expect(levenshtein.Distance(collator.compare, "ab", "a")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "ab", "b")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "abc", "ac")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "xabxcdxxefxgx", "abcdefg")).toBe(6)
  })

  it('swap', () => {
    expect(levenshtein.Distance(collator.compare, "a", "b")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "ab", "ac")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "ac", "bc")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "abc", "axc")).toBe(1)
    expect(levenshtein.Distance(collator.compare, "xabxcdxxefxgx", "1ab2cd34ef5g6")).toBe(6)
  })

  it('combination', () => {
    expect(levenshtein.Distance(collator.compare, "example", "samples")).toBe(3)
    expect(levenshtein.Distance(collator.compare, "sturgeon", "urgently")).toBe(6)
    expect(levenshtein.Distance(collator.compare, "levenshtein", "frankenstein")).toBe(6)
    expect(levenshtein.Distance(collator.compare, "distance", "difference")).toBe(5)
  })

  it('unicode', () => {
    expect(levenshtein.Distance((a, b) => a === b ? 0 : 1, "🤩😀", "🤩😀")).toBe(0)
    expect(levenshtein.Distance((a, b) => a === b ? 0 : 1, "🤩😀", "😀🤩")).toBe(1)
  })

})
