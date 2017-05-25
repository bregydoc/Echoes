def sumaDeDigitos(numero):
    if type(numero) is int:
        numero = str(numero)
    suma = 0
    for i in range(len(numero)):
        suma = suma + int(numero[i])

    return suma

# Sum of digits sequence
a0 = 1

listEuler = [a0]

for i in range(100):
    sumaAux = 0
    for j in range(len(listEuler)):
        sumaAux = sumaAux + sumaDeDigitos(listEuler[j])
    listEuler.append(sumaAux)

print listEuler