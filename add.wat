(module
  (import "console" "log" (func (param f64)))
  (import "console" "consoleLogString" (func (param i32) (param i32)))
  (global $g (import "js" "global") (mut i32))
  (import "js" "mem" (memory $memo 2))
  (func (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.add)
  (func $square (export "square") (param i32) (result i32)
        local.get 0
        local.get 0
        i32.mul
        nop)
  (func (param i32) (param i32) (result i32) (local $loc f64) (local $loc2 f64)
    (i32.add (local.get 1) (call $square
                            (call $square
                              (local.set $loc2
                                (local.set 2
                                  (f64.const 1.2255
                                    (f64.const 2.2255
                                      (local.get 0)))))))))
;;    local.get 0
;;    f64.const 2.2255
;;    f64.const 1.2255
;;    local.set 2
;;    local.set $loc2
;;    call $square
;;    call $square
;;    local.get 1
;;    i32.add)
  (export "add" (func 2))
  (export "squareSquarePlus" (func 4))
  (func (export "logIt")
    f64.const 3.255
    call 0
    (call_indirect (type $void) (i32.const 2)))
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
    global.set $g)
  (func (export "getGlobal") (result i32)
    global.get $g)
  (data (i32.const 0) "StringFro-WasmXYZ")
  (data (i32.const 9) "m")
  (func $writeSth
    i32.const 0
    i32.const 14
    call 1)
  (export "writeSth" (func 11))
  (export "memory" (memory $memo))
  (table 5 funcref)
  (elem (i32.const 1) 5 $writeSth 13 0)
  (type $void (func))
  (type $void2 (func (param f64)))
  (type $return_f64 (func (param f64) (param f64) (result f64)))
  (func (export "callByIndex") (param $i i32) (param f64) (param f64) (result f64)
    i32.const 1
    local.get $i
    i32.eq
    (if
      (then
        local.get 1
        local.get 2
        (call_indirect (type $return_f64) (i32.const 3))
        return)
      (else
        local.get 1
        i32.const 4
        call_indirect (type $void2)
        (call_indirect (type $void) (i32.const 1))))
    f64.const 42)
  (func (param f64 f64) (result f64)
    local.get 0
    local.get 1
    f64.add)
)
