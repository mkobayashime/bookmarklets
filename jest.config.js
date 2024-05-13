const config = {
  resolver: "ts-jest-resolver",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
}

export default config
