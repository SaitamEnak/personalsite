export const articles = [
  {
    slug: 'disenar-con-ia',
    tag: 'Diseño',
    title: 'Diseñar con IA no es lo mismo que diseñar para IA',
    date: '12 mar 2025',
    readingTime: '6 min',
    cover: 'linear-gradient(135deg, #1a0533 0%, #7002FF 100%)',
    body: `
Hay una confusión que se repite en conversaciones sobre el futuro del diseño: tratar "diseñar con IA" y "diseñar para IA" como si fueran lo mismo. No lo son. Y entender la diferencia importa más de lo que parece.

## Diseñar con IA

Diseñar con IA significa incorporar herramientas de inteligencia artificial al proceso de diseño. Usar modelos de lenguaje para generar variantes de copy. Usar diffusion models para explorar estilos visuales. Usar agentes para automatizar partes del flujo de trabajo.

En este caso, el diseñador sigue siendo el agente principal. La IA es un colaborador, un acelerador, una forma de externalizar partes del proceso que antes requerían más tiempo o habilidades específicas.

El riesgo acá no es tecnológico. Es de criterio. Cuando la IA puede generar veinte opciones en segundos, el valor del diseñador ya no está en ejecutar —está en saber cuál de esas veinte opciones vale la pena y por qué.

## Diseñar para IA

Diseñar para IA es otra cosa. Es pensar en la experiencia de un sistema donde parte de los "usuarios" son agentes automatizados. Interfaces que no solo tienen que ser usables para humanos, sino también legibles para máquinas. Flujos donde la acción no siempre la inicia una persona.

Esto cambia fundamentalmente cómo pensamos la jerarquía de información, los estados de error, la retroalimentación del sistema. Un agente no se frustra, pero tampoco improvisa. Necesita instrucciones claras, estados predecibles y salidas bien definidas.

## Por qué importa la distinción

Mezclar los dos conceptos lleva a decisiones de diseño confusas. Equipos que diseñan interfaces "para humanos y para IA" sin entender que esas necesidades a veces se contradicen. Productos que asumen que lo que es claro para una persona también lo es para un modelo de lenguaje.

La práctica del diseño siempre estuvo definida por sus materiales y sus usuarios. Ahora tenemos materiales nuevos y usuarios nuevos. La pregunta no es si la IA cambia el diseño —obviamente lo hace. La pregunta es qué parte de lo que sabemos hacer sigue valiendo y qué parte hay que reaprender desde cero.
    `.trim(),
  },
  {
    slug: 'documentar-decisiones',
    tag: 'Sistemas',
    title: 'Cómo documentar decisiones de diseño sin morir en el intento',
    date: '28 feb 2025',
    readingTime: '5 min',
    cover: 'linear-gradient(135deg, #0a1628 0%, #1a4080 100%)',
    body: `
La documentación de diseño tiene mala fama. Y en parte se la merece.

Hay dos formas de documentar mal: documentar demasiado tarde, cuando nadie recuerda por qué se tomó una decisión. O documentar demasiado, convirtiendo cada pixel en un tratado filosófico que nadie va a leer.

## El problema real

El problema no es la falta de documentación. Es que la mayoría de la documentación responde la pregunta equivocada.

"¿Qué hace este componente?" tiene respuesta en el código. Lo que el código no puede responder es "¿por qué este componente existe de esta forma y no de otra?". Esa es la pregunta que vale la pena documentar.

## Decisiones, no descripciones

La distinción que más me ayudó fue dejar de documentar estados y empezar a documentar decisiones. Una decisión tiene contexto, alternativas consideradas y un razonamiento. Una descripción solo tiene el resultado.

En la práctica: en lugar de escribir "el botón primario es azul", escribir "el botón primario es azul porque en tests A/B con usuarios de 35+ años, el azul tuvo mayor tasa de conversión que el verde que usábamos antes. Revisamos este patrón en 2024."

El segundo formato es más largo. Pero es el único que le sirve a alguien que llega al proyecto seis meses después.

## Cuándo documentar

El momento ideal para documentar una decisión es justo después de tomarla, no después de implementarla. La fricción de escribir en ese momento es mínima porque el contexto está fresco. Hacerlo retroactivamente siempre es una reconstrucción imperfecta.

Un formato que funciona: una nota corta con tres campos — la decisión tomada, las alternativas que se descartaron, y el criterio que inclinó la balanza. No más de cinco oraciones. Si necesitás más, probablemente estás describiendo, no decidiendo.
    `.trim(),
  },
  {
    slug: 'design-tokens-genericos',
    tag: 'Proceso',
    title: 'El problema con los design tokens genéricos',
    date: '10 feb 2025',
    readingTime: '4 min',
    cover: 'linear-gradient(135deg, #1a1a0a 0%, #5a5a00 100%)',
    body: `
Los design tokens son una de las ideas más útiles que aparecieron en el diseño de sistemas en los últimos años. La promesa es clara: un lugar único donde viven los valores de diseño, sincronizado entre código y herramientas de diseño, mantenible a escala.

El problema no son los tokens. El problema son los tokens genéricos.

## Qué es un token genérico

Un token genérico es uno que describe su valor en lugar de su función. \`color-blue-500\`, \`spacing-4\`, \`font-size-lg\`. Estos tokens existen en casi todos los sistemas que conozco, y casi todos los sistemas que conozco tienen el mismo problema con ellos.

El problema: cuando querés cambiar algo, no sabés qué vas a romper.

Si \`color-blue-500\` se usa para botones primarios, links, estados activos, y bordes de inputs, cambiar ese valor para actualizar el color de los botones va a afectar todo lo demás. El token prometía consistencia y entregó acoplamiento.

## Tokens semánticos

La alternativa es nombrar los tokens por su función, no por su valor. \`color-action-primary\`, \`color-text-secondary\`, \`color-border-focus\`. Estos tokens pueden mapearse a los valores genéricos por debajo, pero lo que se expone al sistema de diseño es la intención, no el valor.

Esto tiene un costo: más tokens, más mantenimiento, más decisiones sobre nombres. Pero el beneficio es proporcional: podés cambiar el color primario de la marca en un solo lugar y estar seguro de que solo afecta lo que debería afectar.

## El naming es diseño

El nombre de un token no es un detalle técnico. Es una decisión de diseño. Un token mal nombrado crea ambigüedad que se multiplica con el tiempo y con el equipo. Vale la pena invertir en el naming con el mismo criterio que se invierte en cualquier otra decisión de sistemas.
    `.trim(),
  },
  {
    slug: 'variables-figma',
    tag: 'Herramientas',
    title: 'Variables en Figma: lo que nadie te contó',
    date: '24 ene 2025',
    readingTime: '7 min',
    cover: 'linear-gradient(135deg, #0d1a1a 0%, #006666 100%)',
    body: `
Cuando Figma lanzó las variables, la reacción del ecosistema de diseño fue dividida. Para algunos, era la feature que faltaba para hacer design systems serios. Para otros, era una capa de complejidad innecesaria sobre algo que ya funcionaba con estilos.

Después de usarlas en proyectos reales durante varios meses, tengo una posición más matizada.

## Lo que las variables hacen bien

Las variables resuelven un problema que los estilos no podían resolver: los estados. Un componente que tiene un color en reposo y otro en hover, un espaciado que cambia entre mobile y desktop, una tipografía que varía según el modo de tema. Todo eso antes requería duplicar componentes o usar workarounds. Con variables, es nativo.

El modo de theming es genuinamente poderoso. Poder cambiar entre light y dark mode —o entre variantes de marca— en un documento completo con un switch, y que eso afecte todos los componentes de forma consistente, es algo que cambia cómo se presenta y cómo se mantiene un sistema de diseño.

## Lo que las variables no resuelven

Las variables no son tokens. O más precisamente: pueden representar tokens, pero no son un sistema de tokens.

Un sistema de tokens tiene jerarquía, semántica, y una relación clara entre valores primitivos y decisiones de uso. Las variables de Figma tienen colecciones y modos, pero no tienen una forma nativa de expresar que \`color/action/primary\` mapea a \`color/blue/500\` y que \`color/blue/500\` tiene el valor \`#0066ff\`.

Podés construir esa jerarquía manualmente, y vale la pena hacerlo. Pero requiere disciplina y convenciones que el equipo tiene que adoptar, porque Figma no las impone.

## La curva de adopción

El problema más práctico con las variables es la curva de adopción en equipos mixtos. Los diseñadores más juniors —o los que vienen de flujos más informales— encuentran las variables confusas al principio. Y si no hay alguien que establezca las convenciones desde el inicio, la colección de variables se convierte rápidamente en un caos difícil de mantener.

Mi recomendación: empezar pequeño. Un modo de theming, una colección de colores semánticos, espaciado básico. Demostrar el valor con eso antes de intentar modelar todo el sistema de diseño en variables.
    `.trim(),
  },
  {
    slug: 'design-systems-como-fin',
    tag: 'Reflexión',
    title: 'Cuando el diseño de sistemas se convierte en un fin en sí mismo',
    date: '8 ene 2025',
    readingTime: '5 min',
    cover: 'linear-gradient(135deg, #1a0a0a 0%, #801a1a 100%)',
    body: `
Hay un momento en el ciclo de vida de muchos design systems donde algo se tuerce. El sistema, que nació para servir a los productos, empieza a exigir que los productos lo sirvan a él.

Lo reconocés porque empezás a escuchar frases como "no podemos hacer eso, no está en el sistema" en reuniones donde antes se decía "¿cómo lo hacemos?".

## El sistema como burocracia

Un design system bien mantenido es un activo. Reduce fricción, acelera decisiones, mantiene consistencia. Pero un design system que se administra como un fin en sí mismo —que mide su éxito en la cantidad de componentes, en la cobertura, en la adopción— pierde de vista para qué existe.

Los sistemas de diseño existen para ayudar a equipos a construir mejores productos más rápido. Si un sistema frena eso, no importa cuán bien documentado esté o cuántos componentes tenga.

## El costo de la consistencia absoluta

Hay una tensión real entre consistencia y adecuación al contexto. Un componente genérico que funciona para el 80% de los casos a veces es exactamente lo que se necesita. Pero ese mismo componente, aplicado en el 20% restante donde no encaja, produce interfaces que se sienten forzadas.

La consistencia tiene valor hasta el punto en que empieza a comprometer la calidad de la experiencia. Pasado ese punto, lo correcto es divergir del sistema, documentarlo, y eventualmente decidir si esa divergencia vale la pena sistematizar.

## Un sistema vivo

Los mejores design systems que conozco tienen algo en común: tratan las excepciones como información. Cuando un equipo necesita algo que el sistema no tiene, eso no es un problema de adopción —es una señal de que el sistema tiene una brecha.

Un sistema que aprende de sus excepciones crece en la dirección correcta. Uno que las suprime crece en la dirección del equipo que lo mantiene, no de los equipos que lo usan.
    `.trim(),
  },
  {
    slug: 'agentes-ia-disenador',
    tag: 'IA',
    title: 'Agentes de IA y el futuro del diseñador de producto',
    date: '2 ene 2025',
    readingTime: '8 min',
    cover: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a60 100%)',
    body: `
2024 fue el año en que los agentes de IA pasaron de ser un concepto teórico a algo que podés usar en producción. No de forma perfecta ni omnisciente, pero sí de forma suficientemente capaz como para cambiar lo que significa hacer trabajo de diseño.

La pregunta que más me hicieron en el último año: ¿los diseñadores de producto van a desaparecer?

La respuesta corta es no. La respuesta larga es más interesante.

## Lo que los agentes hacen bien

Los agentes son buenos en tareas con contexto acotado y criterios de éxito claros. Generar variantes de un componente dado un conjunto de constraints. Revisar si un diseño cumple con criterios de accesibilidad. Extraer tokens de una imagen. Escribir copy para estados de error siguiendo un tono de voz definido.

Todo eso era trabajo de diseño. Seguirá siendo trabajo de diseño. Pero el tiempo que llevaba hacerlo colapsa.

## El diseñador como árbitro

Cuando una tarea que antes tomaba tres horas toma tres minutos, lo que cambia no es solo la velocidad —cambia el tipo de trabajo que hace la persona.

Un diseñador que usaba tres horas generando variantes pasaba relativamente poco tiempo eligiendo entre ellas y razonando sobre las implicancias de cada opción. Con agentes, esa proporción se invierte. La mayor parte del tiempo es criterio: evaluar, rechazar, refinar, decidir.

Eso es, en cierta forma, el trabajo de diseño en su forma más pura. El problema es que requiere un nivel de claridad conceptual y de criterio que no siempre se desarrolla cuando la mayor parte del tiempo se gasta en ejecución.

## La brecha que se abre

Lo que veo es una bifurcación. Diseñadores que adoptan agentes como herramientas y los usan para ampliar su capacidad de generar y evaluar opciones. Y diseñadores que los evitan —ya sea por escepticismo o por comodidad con los flujos actuales— y que eventualmente hacen el mismo trabajo pero más lento.

No es una bifurcación moral. Es una bifurcación de productividad, y en equipos donde los recursos son limitados, eso tiene consecuencias concretas.

## Lo que no cambia

Lo que los agentes no pueden hacer —al menos no todavía, y probablemente no pronto— es entender el contexto organizacional, negociar con stakeholders, detectar cuándo un brief está mal formulado, o tener el tipo de conversación donde el problema real emerge.

Esas son habilidades de diseñador. No de ejecución: de juicio, de comunicación, de entendimiento del sistema social en el que opera un producto.

El futuro del diseñador de producto no es menos trabajo. Es trabajo diferente, con herramientas diferentes, que requiere desarrollar músculos distintos a los que la práctica actual privilegia.
    `.trim(),
  },
]

export function getArticle(slug) {
  return articles.find(a => a.slug === slug) ?? null
}
