(module
  (import "console" "log" (func (param f64)))
  (global $g (import "js" "global") (mut i32))
  (func (param i32) (param i32) (result i32)
    local.get 0
    local.get 1
    i32.add)
  (func $square (export "square") (param i32) (result i32)
        local.get 0
        local.get 0
        i32.mul)
  (func (param i32) (param i32) (result i32) (local $loc f64) (local $loc2 f64)
    local.get 0
    f64.const 2.2255
    f64.const 3.2255
    local.set 2
    local.set $loc2
    call $square
    call $square
    local.get 1
    i32.add)
  (export "add" (func 1))
  (export "squareSquarePlus" (func 3))
  (func (export "logIt")
    f64.const 2.2255
    call 0)
  (global (mut i32)
    i32.const 1)
  (func (export "setGlobal1")
    i32.const 2
    global.set 1)
  (func (export "getGlobal1") (result i32)
    global.get 1)
  (func (export "incGlobal1")
    global.get 1
    i32.const 1
    i32.add
    global.set 1)
  (func (export "setGlobal")
    i32.const 5
    global.set $g))