(module
  (func (param i32) (param i32) (result i32)
    local.get 0
    local.get 1
    i32.add)
  (func $square (param i32) (result i32)
        local.get 0
        local.get 0
        i32.mul)
  (export "add" (func 0))
  (export "square" (func $square)))