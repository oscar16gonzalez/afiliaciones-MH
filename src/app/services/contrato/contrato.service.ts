import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfMake';
import { CurrencyPipe, DatePipe, getCurrencySymbol } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  date = new Date('Julio 12 2011');
  fecha;
  
  constructor() {
    this.fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
  }



  cretateContract(infoUser, infoProject){
    console.log(infoProject);
    
    const CONTRACT= {
      content: [
        {
          stack: [
            'CONTRATO DE TRABAJO POR OBRA O LABOR CONTRATADA',
            
          ],
          style: 'header2'
        },
        {
          stack: [
            'I. PARTES CONTRATANTES:',
            
          ],
          style: 'header2'
        },
        {
          text: [
            `EMPLEADOR:  ${infoProject.nombre_rep_legal}, identificado con cedula No. ${infoProject.cedula_rep_legal}, con domicilio en CRA 24. NO. 22-02 OF 504, representante del ${infoProject.contratista}, identificado con Nit. ${infoProject.nit}`,
          ],
          style: 'texto'
        },
        {
          text: [
            `TRABAJADOR: ${infoUser[0].nombre} ${infoUser[0].apellido}  , mayor de edad, identificado con cedula de ciudadanía No. ${infoUser[0].cedula}`,
          ],
          style: 'texto2'
        },
        {
          text: [
            'II. TIPO DE CONTRATO:',
          ],
          style: 'texto3'
        },
        {
            text: [
              'Entre EL EMPLEADOR y EL TRABAJADOR se ha celebrado el presente contrato individual de trabajo por obra o labor contratada, regido por el Código Sustantivo del Trabajo, normatividad vigente y por las siguientes cláusulas:',
            ],
            style: 'texto2'
        },
        {
          text: [
            'III. CLAUSULAS:',
          ],
          style: 'texto3'
        },
        {
            text: [
              'Las cláusulas especiales que regirán el contrato de trabajo serán las siguientes:',
            ],
            style: 'texto2'
        },
        {
            text: [
              `PRIMERA: OBJETO.- EL EMPLEADOR contrata los servicios personales de EL TRABAJADOR y éste se obliga: a) A poner al servicio del EMPLEADOR y en forma exclusiva toda su capacidad normal de trabajo en el desempeño de las funciones propias del oficio o cargo mencionado que será ${infoUser[0].cargo} y en las labores anexas y complementarias del mismo, de conformidad con las órdenes e instrucciones que le imparta el EMPLEADOR directamente o a través de sus representantes, observando en su cumplimiento la diligencia y el cuidado necesarios para desarrollar las funciones descritas en el manual de funciones, así como las siguientes ocupaciones:`,
            ],
            style: 'texto2'
        },
        {
            
          ul: [
            'Usar adecuadamente las herramientas, accesorios, equipos y demás elementos a cargo',
            'Utilizar en forma apropiada los Elementos de Protección Personal y de seguridad exigidos acordes con la actividad contratada',
            'Brindar aportes y participar en la implementación y desarrollo del Sistema de Gestión de la Seguridad y Salud en el Trabajo.',
            'Cumplir con las normas, objetivos, metas, programas y políticas del Sistema de Gestión Integral (De Seguridad y Salud en el Trabajo SG-SST, Medio Ambiente y el de Seguridad), con el Reglamento Interno de Trabajo de la empresa, con el plan HSEQ y acatar los instructivos y procedimientos creados por el empleador.',
            'Participar activamente en los planes de emergencias, facilitando las actividades del personal entrenado y/o miembros socorristas o brigadistas.',
            'Promover la observación de medidas de seguridad y toma de acciones correctivas inmediatas ante prácticas y/o condiciones inseguras.',
            'Colaborar y participar en la ejecución de las medidas de prevención de riesgos para la salud que se adoptan en el lugar de trabajo.',
            'Informar todos los incidentes, accidentes de trabajo, enfermedades laborales que se presenten, participando en la investigación de los mismos aplicando los procedimientos establecidos.',
            'Informar al Comité Paritario de Seguridad y Salud en el Trabajo sobre cualquier Factor de Riesgo que exista en el sitio de trabajo o cualquier área de la empresa.',
            'Contribuir con el adecuado manejo de residuos.',
            'Las demás funciones relacionadas con el cargo que, por disposición del superior jerárquico, le sean asignadas'
          ],
          style: 'texto5'
        },
        {
            text: [
              'b) A no prestar directa ni indirectamente servicios laborales a otros empleadores, ni a trabajar por cuenta propia en el mismo oficio, durante la vigencia de este contrato.',
            ],
            style: 'texto6'
        },
        {
            text: [
              'c) A guardar absoluta reserva sobre los hechos, documentos físicos y/o electrónicos, informaciones y en general, sobre todos los asuntos y materias que lleguen a su conocimiento por causa o con ocasión a su trabajo',
            ],
            style: 'texto6'
        },
        {
            text: [
              'd) A prestar el servicio personalmente en el Área Metropolitana de Bucaramanga (en las instalaciones y/o lugares que la empresa determine), y excepcionalmente fuera de dichos territorios cuando las necesidades del servicio así lo exigieren.',
            ],
            style: 'texto6'
        },
        {
            text: [
              `SEGUNDA: SALARIO. - EL EMPLEADOR pagará a EL TRABAJADOR por la prestación de sus servicios el salario indicado en el encabezado del presente documento, que asciende a la suma mensual de $ ${infoUser[0].salario }, pagadero por quincenas vencidas. Dentro de esta suma de dinero se encuentra incluida la remuneración de los descansos dominicales y festivos de que tratan los Capítulos I, II y III del Título VII del Código Sustantivo del Trabajo. PARÁGRAFO. De igual manera se aclara y se conviene que en los casos en que EL TRABAJADOR devengue comisiones o cualquier otra modalidad de salario variable, el 82.5% de dichos ingresos constituyen remuneración de la labor realizada, y el 17.5% restante está destinado a remunerar el descanso en los días dominicales y festivos de qué tratan los Capítulos I y II del Título VIII del Código Sustantivo del Trabajo.`,
            ],
            style: 'texto2'
        },
        {
          text: [
            'TERCERA: PAGOS NO CONSTITUTIVOS DE SALARIO.- EL TRABAJADOR y EL EMPLEADOR, acuerdan expresamente que no constituye salario, para ningún efecto, los pagos, reconocimientos o suministros que se le lleguen a hacer o se le hagan al primero por concepto de beneficios o auxilios otorgados en forma extralegal por EL EMPLEADOR, tales como: La alimentación (desayunos, almuerzos o cenas), la habitación o vivienda, las comunicaciones, el transporte, el vestuario, bonificaciones extralegales por mera liberalidad, auxilios en dinero o en especie, las primas de: Vacaciones, servicios, navidad, aguinaldos, auxilios o beneficios para estudio, por muerte de familiares o por calamidad doméstica, auxilios o reconocimientos por medicamentos, consultas médicas u odontológicas, o cualquier otro beneficio similar a los anteriormente enunciados y que si algún pago de ellos llegase a serlo, acuerdan desde ya que no deberá tenerse en cuenta como factor salarial para la liquidación de acreencias laborales, ni para el pago de aportes parafiscales y cotizaciones a la seguridad social, de conformidad con los Artículos 15 y 16 de la Ley 50/90. CUARTA: EL EMPLEADOR y EL TRABAJADOR acuerdan expresamente mediante este contrato que la alimentación (desayunos, almuerzos y/o cenas) y el alojamiento que reciba el empleado por razón de las funciones que deba desempeñar para la empresa no constituyen salario, y que en caso de ser salario pactan las partes que no se tendrá en cuenta para la liquidación de prestaciones sociales y obligaciones a la seguridad social y/o indemnizaciones y/o vacaciones y/o obligaciones laborales de cualquier especie.',
          ],
          style: 'texto2'
        },
        {
            text: [
              'QUINTA: DURACIÓN DEL CONTRATO. - El término inicial de duración del contrato será el señalado en el encabezado del presente documento. Si antes de la fecha del vencimiento del término estipulado, ninguna de las partes avisare por escrito a la otra su determinación de no prorrogar el contrato, con una antelación no inferior a treinta (30) días, éste se entenderá renovado por un período igual al inicialmente pactado, de conformidad con lo dispuesto en el artículo 46 del C.S.T, modificado por el artículo 3 de la Ley 50/90.',
            ],
            style: 'texto2'
        },
        {
            text: [
              'SEXTA: PERÍODO DE PRUEBA. - Se conviene como período de prueba la quinta parte del término de duración del presente contrato. (Sin exceder los dos (2) meses). En caso de prorrogas o continuidad del contrato entre las partes se entenderá que no hay nuevo período de prueba. Este período de prueba tiene por objeto, por parte del EMPLEADOR apreciar las aptitudes del TRABAJADOR y por parte de éste la conveniencia de las condiciones de trabajo. Durante este período puede darse por terminado el contrato unilateralmente en cualquier momento, sin previo aviso y sin dar lugar a ninguna indemnización.',
            ],
            style: 'texto2'
        },
        {
            text: [
              'SÉPTIMA: JORNADA DE TRABAJO. - EL TRABAJADOR se obliga a laborar la jornada ordinaria en los horarios de trabajo y/o turnos señalados por EL EMPLEADOR, pudiendo hacer éste ajustes o cambios de horario cuando lo estime conveniente, con el fin de dar cumplimiento al objeto social, a los contratos de prestación de servicios, convenios u órdenes de servicio suscritos con empresas contratantes o clientes. Los horarios o turnos dependerán de las necesidades de la empresa o requerimientos de las empresas contratantes.',
            ],
            style: 'texto2'
        },
        {
                text: [
                    'OCTAVA: TRABAJO NOCTURNO, SUPLEMENTARIO, DOMINICAL O FESTIVO. - Todo trabajo nocturno, suplementario o en horas extras o en día domingo o festivo en los que legalmente debe concederse descanso, se remunerará conforme lo dispone expresamente la ley, salvo acuerdo en contrario contenido en convención, pacto colectivo o laudo arbitral. Para el reconocimiento y pago del trabajo nocturno, suplementario, dominical o festivo, el EMPLEADOR o sus representantes deberán haberlo autorizado previamente y por escrito. Cuando la necesidad de este trabajo se presente de manera imprevista o inaplazable, deberá ejecutarse y darse cuenta de él por escrito, a la mayor brevedad, a la empresa o sus representantes para su aprobación. El EMPLEADOR, en consecuencia, no reconocerá ningún trabajo suplementario, o trabajo nocturno o en días de descanso legalmente obligatorio que no haya sido autorizado previamente o que, habiendo sido avisado inmediatamente, no haya sido aprobado como queda dicho.',
                ],
                style: 'texto2'
            },
            {
                text: [
                    'NOVENA: SON OBLIGACIONES RELACIONADAS CON ESTE CONTRATO. - Las que imponga la ley, las propias o inherentes a la función y/o oficio para el cual es contratado EL TRABAJADOR; las que por medio de este contrato adquiere y las que en forma verbal le imparta el Empleador y/o sus representantes. En razón a lo anterior EL TRABAJADOR se obliga especialmente para con el EMPLEADOR a:',
                ],
                style: 'texto2'
            },
            {
                type: 'none',
                ul: [
                        '1. Realizar la labor encomendada aplicando a ella los conocimientos técnicos, de conformidad con la técnica o profesión, haciendo que su gestión mantenga la integración necesaria para dar cabal cumplimiento al contrato para el cual ha sido vinculado.',
                        '2. Ejecutar las actividades que sean conexas o complementarias a las labores para las cuales ha sido contratado',
                        '3. Cumplir el Reglamento Interno de Trabajo actualmente vigente en la empresa, así como el Reglamento de Higiene y Seguridad Industrial.',
                        '4. Guardar estricta reserva de todo lo que llegue a su conocimiento en razón de su oficio y que sea de naturaleza reservada y cuya comunicación pueda causar perjuicios al EMPLEADOR.',
                        '5. Presentarse al trabajo o cualquier otro lugar que se le indique, a la hora señalada, para el cumplimiento de sus labores',
                        '6. Concurrir puntualmente a las reuniones que cite el EMPLEADOR en especial a las que se vayan a tratar temas relacionados con su oficio y funciones, procurando aportar sus ideas y participando activamente en ellas.',
                        '7. Laborar todo el tiempo que sea necesario para dejar bien cumplidos sus deberes y/o funciones.',
                        '8. Informar inmediatamente al EMPLEADOR sobre cualquier irregularidad que observe, ya sea que se relacione directa o indirectamente con las funciones asignadas y con los deberes propios de su cargo',
                        '9. Cumplir todas las órdenes que se den sobre asistencia a reuniones, capacitaciones, programas de recreación, integración, etc.',
                        '10. Dar permanentemente a sus ayudantes o auxiliares, si los tuviere, las instrucciones y órdenes que considere necesarias para el correcto y eficaz cumplimiento de sus funciones de acuerdo con las normas establecidas por el EMPLEADOR.',
                        '11. Velar y colaborar en el desarrollo de los negocios, programas y proyectos del EMPLEADOR',
                        '12. Asesorar y apoyar a sus superiores en la tarea de capacitación de asistentes, ayudantes o auxiliares, aportando ideas, experiencias, opiniones, observaciones y demás iniciativas que sean útiles al EMPLEADOR.',
                        '13. Informar al EMPLEADOR sobre cualquier falta que cometan sus compañeros contra las órdenes del EMPLEADOR, los reglamentos, contratos, etc., y que sean observadas por el TRABAJADOR durante el desempeño de sus funciones.',
                        '14. Asumir e identificarse progresivamente con la filosofía y valores de la empresa.',
                        '15. Ejecutar de forma adecuada y competente sus funciones.',
                        '16. Utilizar siempre en el desempeño de sus funciones las herramientas, elementos de protección personal, implementos de seguridad y/o dotación determinados y proporcionados por la empresa.',
                        '17. Observar estrictamente las órdenes o instrucciones que se le señalen y en especial a guardar rigurosa moralidad, buenas costumbres y correcto comportamiento, tanto dentro de la empresa como fuera de ella, evitando todo lo que pueda redundar en menoscabo del prestigio personal y de la organización.',
                        '18. Avisar a la gerencia o jefe inmediato, la causa por la cual no puede asistir a su trabajo o desarrollar sus funciones dentro de los horarios señalados.',
                        '19. Permanecer en su puesto de trabajo toda la jornada laboral y a no ausentarse de este sin la debida autorización.',
                        '20. Guardar y proteger la reserva comercial e industrial de la empresa',
                        '21. Abstenerse de utilizar indebidamente la información privilegiada.',
                        '22. Comunicar al EMPLEADOR oportunamente los cursos y capacitaciones realizados en actividades relacionadas con el objeto social de la empresa.',
                        '23. Coordinar y revisar avances de las actividades del personal de apoyo con relación a los trabajos que este ejecutando laempresa',
                        '24. Liderar y velar por el cumplimiento de procedimientos, instructivos y normatividad en la realización de los diferentes informes técnicos y HSE, con el fin de brindar resultados confiables y seguros',
                        '25. Participar y aprobar las capacitaciones en temas relacionados con el Sistema de Gestión Integral',
                        '26. Entregar los trabajos asignados en los tiempos definidos en los cronogramas o señalados por el superior jerárquico.',
                        '27. Mantener en orden y aseo el sitio de trabajo.',
                        '28. Desarrollar adecuadamente sus funciones, respetando a todos, siendo un buen ejemplo para los demás. PARÁGRAFO: EL TRABAJADOR de forma libre y espontánea exime de cualquier tipo de responsabilidad al EMPLEADOR por los daños, perjuicios y/o lesiones que llegue a sufrir y por aquellos que ocasione a bienes materiales e inmateriales de terceros, causados por factores humanos por parte del TRABAJADOR.'
                    ],
                    style: 'texto7'
                
            },
            {
                text: [
                        'DÉCIMA: Son obligaciones especiales del trabajador.',
                    ],
            style: 'texto2'
            },
            {
                ul: [
                        'Ser leal con el empleador y con los clientes en el desarrollo de sus funciones.',
                        'Consultar cuando una tarea o labor no esté clara dentro de su procedimiento y abstenerse de tomar decisiones al respecto sin consultar con su jefe inmediato o superior',
                        'Buscar y recibir instrucciones sobre la manera correcta como debe ser manejados las herramientas de trabajo o instrumentos dados para su uso, a fin de evitar y prevenir todo riesgo o error.',
                        'Utilizar adecuadamente las herramientas de trabajo, elementos de protección personal, equipos y maquinaria entregados para la realización correcta de la labor y en especial para la realización de aquellas tareas en las cuales sea obligatorio su uso.',
                        'Evaluar y/o considerar los riesgos que genera el desarrollo de las actividades ordenadas por la empresa y/o superior jerárquico.',
                        'Comunicar a su jefe inmediato cualquier falla humana, física o mecánica, que se presente en la realización del trabajo, para tomar medidas correctivas',
                        'Cumplir el Código Nacional de Tránsito Terrestre, vigente en el territorio colombiano.',
                        'Custodiar y cuidar los equipos, herramientas y vehículos asignados y/o entregados por la empresa',
                        'Lucir en excelentes condiciones de presentación personal, proyectando una imagen de pulcritud y limpieza',
                        'Empezar las labores en forma puntual de acuerdo con el horario de trabajo señalado por la empresa.',
                        'Desarrollar las gestiones que se le encomienden con rapidez y eficiencia.',
                        'Racionalizar el tiempo que dedica para realizar cada una de las actividades encomendadas.',
                        'Reportar de forma inmediata o antes de iniciar la jornada de trabajo o durante la primera hora hábil del horario de trabajo todas las incapacidades que le sean dadas por parte de la EPS o ARL respectiva y entregar la certificación a la empresa el día hábil siguiente a su expedición',
                        'Gestionar la programación de citas médicas y odontológicas en horarios que no interfieran el desarrollo normal del trabajo. Se exceptúan las urgencias y lo relacionado con accidentes de trabajo que deben ser reportados para recibir atención en forma inmediata',
                        'Suministrar información exacta y precisa de su lugar de residencia, dirección y teléfono, debiendo comunicar al empleador de forma inmediata los cambios que se generen en alguno de estos datos.',
                        'Devolver al empleador, una vez terminado el presente contrato, los elementos especiales de trabajo, equipos y uniformes suministrados para desarrollar de forma adecuada su labor',
                        
                    ],
                    style: 'texto8'
            },
            {
                    text: [
                        'PARÁGRAFO: EL TRABAJADOR se obliga a responder por las herramientas de trabajo, elementos de protección personal, equipos, vehículos y maquinaria recibidos del EMPLEADOR, todos estos deberán ser devueltos en buen estado, salvo el deterioro normal por el uso cuidadoso de los mismos.',
                    ],
                    style: 'texto2'
            },
            {
                    text: [
                        'DÉCIMA PRIMERA: Son prohibiciones especiales del trabajador',
                    ],
                    style: 'texto2'
            },
            {
                ul: [
                        'Ejecutar sus funciones en compañía de familiares o amigos.',
                        'Levantar o movilizar manualmente cargas que pongan en peligro su integridad física, si éstas no se ejecutan de acuerdo con las instrucciones de seguridad sobre la posición del cuerpo, de los pies y de los brazos en la manipulación de cargas',
                        'Fumar dentro de las instalaciones de la empresa o en el lugar de prestación del servicio cuando se está en el ejercicio de sus funciones.',
                        'Desarrollar cuestiones ajenas o distintas a las encomendadas por la empresa y/o superior jerárquico',
                        'Atender durante las horas de trabajo asuntos de carácter estrictamente personal.',
                        'Utilizar el buen nombre del empleador o empresa para realizar labores que le reporten lucro o beneficio personal, o trabajar por su propia cuenta en actividades propias del objeto social del EMPLEADOR o de las empresas de que éste sea socio. Está prohibición se extiende a su cónyuge y los parientes hasta segundo grado de consanguinidad y primer grado de afinidad.',
                        'Desplazarse a sitios o zonas diferentes a las asignadas por el empleador para la realización de sus funciones, sin contar con la debida autorización de su superior inmediato.',
                        'Retirar de las instalaciones donde funciona la empresa o donde ejecute obras EL EMPLEADOR bienes, equipos, maquinarias, insumos, útiles de trabajo, programas de información, documentación, archivos y/o cualquier herramienta u objeto del EMPLEADOR sin previo permiso escrito de éste.',
                        'Solicitar préstamos y/o ayudas económicas a los clientes del EMPLEADOR',
                        'Aceptar donaciones de cualquier clase de los clientes y/o proveedores del EMPLEADOR sin previa autorización escrita de la empresa',
                        'Presentar cuentas de gastos ficticias y/o recibos de pago alterados.',
                        'Reportar como cumplidas visitas o tareas no efectuadas',
                        'Autorizar y/o desarrollar actividades u operaciones que afecten los intereses del EMPLEADOR o que no sean de su competencia.',
                        'Negociar y/o vender bienes, equipos, maquinarias y/o insumos, mercancía, entre otros, de propiedad del empleador sin previa autorización y en provecho propio.',
                        'Retener dineros y/o hacer efectivos cheques recibidos a favor del EMPLEADOR sin previa autorización escrita del superior jerárquico',
                        'Revelar secretos técnicos y/o comerciales o dar a conocer asuntos de carácter reservado.',
                        'Reproducir, vender, distribuir, suministrar u ofrecer cualquier software de la empresa.',
                        'Transportar en el vehículo asignado personas no autorizadas previamente por el superior jerárquico.',
                        'Utilizar los vehículos, equipos y/o maquinaria para fines distintos a los señalados por la empresa.',
                    ],
                    style:'texto8'
            },
            {
                text: [
                        'PARÁGRAFO: El incurrir en cualquiera de estas prohibiciones será considerado como falta grave.',
                    ],
                    style: 'texto2'
            },
            {
                text: [
                        'DÉCIMA SEGUNDA: SON JUSTAS CAUSAS PARA DAR POR TERMINADO UNILATERALMENTE ESTE CONTRATO, por cualquiera de las partes, las enumeradas en el artículo 62 del C.S.T, modificado por el artículo 7 del Decreto 2351/65 y además, por parte de EL EMPLEADOR, las faltas que para el efecto se califiquen como graves en este contrato, reglamento interno de trabajo, manuales, instructivos, protocolos, procedimientos y demás documentos que contengan reglamentaciones, órdenes, instrucciones o prohibiciones de carácter general o particular, pactos, convenciones colectivas, laudos arbitrales y las que expresamente se pacten. En este sentido, las partes expresamente acuerdan calificar como graves para todos los efectos legales las siguientes faltas si ellas llegasen a ser cometidas por el trabajador:',
                        
                    ],
                    style: 'texto2'
            },
            {
                type: 'none',
                ul: [
                        '1. La violación por parte del trabajador de cualquiera de sus obligaciones, deberes y prohibiciones legales, contractuales o reglamentarias, aún por la primera vez.',
                        '2. La no asistencia puntual al trabajo, sin excusa suficiente a juicio del empleador, aún por la primera vez.',
                        '3. La ejecución por parte del trabajador de labores remuneradas a servicio de terceros sin autorización del empleador, aún por la primera vez.',
                        '4. La revelación de secretos y datos reservados de la empresa, aún por la primera vez',
                        '5. Las desavenencias con sus compañeros de trabajo, aún por la primera vez',
                        '6. El hecho de que el trabajador llegue embriagado o en estado de alicoramiento al trabajo o que ingiera bebidas embriagantes en el sitio o lugar donde debe desempeñar sus labores, aun por la primera vez',
                        '7. El hecho que el trabajador abandone el sitio de trabajo o el lugar donde deba cumplir con sus funciones sin el permiso de sus superiores, aún por la primera vez',
                        '8. La no asistencia a una sección completa de la jornada de trabajo, o más, sin excusa suficiente a juicio del empleador, salvo fuerza mayor o caso fortuito, aún por la primera vez.',
                        '9. No aceptar el cambio de horario de trabajo o lugar de trabajo sin razones válidas expuestas al empleador, aún por la primera vez.',
                        '10. Amenazar a sus compañeros de trabajo y/o superiores de la empresa dentro o fuera del sitio de trabajo, aún por la primera vez',
                        '11. El usar, vender, distribuir y/o portar drogas alucinógenas o estupefacientes en el sitio de trabajo, aún por la primera vez.',
                        '12. El utilizar el nombre de la empresa para obtener cualquier tipo de provecho para sí, para sus parientes o allegados, aún por la primera vez.',
                        '13. El calumniar o injuriar a sus compañeros de trabajo, superiores o los familiares de estos, dentro o fuera de ésta, aún por la primera vez',
                        '14. El pelear de palabra o de obra dentro o fuera del sitio de trabajo con sus compañeros, superiores, clientes de la empresa, aún por la primera vez',
                        '15. Irrespetar de palabra o de obra dentro o fuera de la organización a sus compañeros de trabajo y/o superiores, y/o clientes de ésta, aún por la primera vez.',
                        '16. Cualquier información carente de veracidad suministrada a la empresa, aún por la primera vez',
                        '17. Cualquier respuesta grosera dada a la Gerencia, Directivos, Jefes, a los propietarios o socios de la empresa o a los compañeros de trabajo, o a los clientes de ésta, aún por la primera vez',
                        '18. Cualquier daño que cause a los materiales de trabajo, maquinaria y/o equipos por mal operación o manejo, aún por la primera vez',
                        '19. No presentar los informes o reportes en el momento indicado por la empresa, aún por la primera vez',
                        '20. Suspender la labor sin autorización, aún por la primera vez.',
                        '21. No cumplir con la labor programada, aún por la primera vez.',
                        '22. No tomar las medidas de seguridad exigidas en la compañía, aún por la primera vez',
                        '23. El hacer caso omiso a las llamadas de atención por ineficiencia en la labor, aún por la primera vez.',
                        '24. Entorpecer las tareas de sus compañeros, aún por la primera vez',
                        '25. La no entrega oportuna de las tareas asignadas, aún por la primera vez',
                        '26. Extraer información de la empresa (proveedores, clientes, servicios, documentos, trabajos, etc.) para ser utilizada en provecho personal o de la competencia, aún por la primera vez.',
                        '27. Realizar rifas o negocios personales dentro de la empresa, aún por la primera vez.',
                        '28. La pérdida de herramientas o implementos de trabajo dados a su cargo y bajo su responsabilidad y cuidado, aún por la primera vez',
                        '29. Cualquier violación de las cláusulas, obligaciones y prohibiciones establecidas en este contrato, aún por la primera vez.',
                        '30. Cualquier violación de las órdenes y/o instrucciones establecidas en comunicaciones, circulares, memos, etc., expedidos por la empresa, aún por la primera vez.',
                        '31. Todo acto inmoral o reprensible cometido por el trabajador, dentro o fuera de las dependencias de la empresa o lugar de trabajo, aún por la primera vez',
                        '32. Cualquier acto que atente contra el buen nombre de la empresa o de sus directivas, aún por la primera vez. ',
                        '33. El no portar en forma adecuada en todo momento, su uniforme o dotación, elementos de protección personal y/o seguridad industrial, aún por la primera vez. ',
                        '34. No ser leal con los clientes y con el empleador en el desarrollo de sus funciones.',
                        '35. Reprobar por tercera vez consecutiva la evaluación de una capacitación relacionada con el Sistema de Gestión Integral, aún por la primera vez.',
                        '36. Negociar y/o vender bienes, equipos, maquinarias y/o insumos, mercancía, entre otros, de propiedad del empleador sin previa autorización y en provecho propio, aún por la primera vez',
                        '37. Retener dineros y/o hacer efectivos cheques recibidos a favor del EMPLEADOR sin previa autorización escrita del superior jerárquico, aún por la primera vez',
                        '38. Revelar secretos técnicos y/o comerciales o dar a conocer asuntos de carácter reservado, aún por la primera vez',
                        '39. Reproducir, vender, distribuir, suministrar u ofrecer cualquier software de la empresa, aún por la primera vez',
                        '40. Transportar en el vehículo asignado personas no autorizadas previamente por el superior jerárquico, aún por la primera vez.',
                        '41. Utilizar los vehículos, equipos y/o maquinaria para fines distintos a los señalados por la empresa, aún por la primera vez.'
                    
                    
                    
                    ],
                    stylet: 'texto7'
            },
            {
                    text: [
                            'DÉCIMA TERCERA: EL TRABAJADOR está obligado a dar aviso oportuno al EMPLEADOR cuando por cualquier causa nopueda concurrir al trabajo, capacitaciones, reuniones, integraciones u actividades que organice la empresa. Si la justa causa fuera la enfermedad además del aviso, deberá presentar certificado y/o incapacidad médica de la EPS o ARL a la que esté afiliado (No son válidas las incapacidades de médicos particulares para justificar la inasistencia). En los demás casos, además del aviso deberá demostrar por el medio pertinente, la razón de su no asistencia, o su retardo.',
                    ],
                    style: 'texto'
            },
            {
                    text: [
                            'DÉCIMA CUARTA: EL TRABAJADOR acepta desde ahora expresamente todas las modificaciones y/o reestructuraciones de sus condiciones laborales determinadas por EL EMPLEADOR en ejercicio de su poder subordinante, tales como el horario de trabajo, el lugar de prestación del servicio, el cargo u oficio y/o funciones, siempre que tales modificaciones no afecten su honor, dignidad o sus derechos mínimos, ni impliquen desmejoras sustanciales o graves perjuicios para él, de conformidad con lo dispuesto por el artículo 23 del C.S.T modificado por el artículo 1 de la Ley 50/90. PARÁGRAFO: Los gastos que se originen con el traslado, si a ello hubiere lugar, serán cubiertos por el empleador de conformidad con lo establecido en la ley.',
                    ],
                    style: 'texto2'
            },
            {
                    text: [
                            'DÉCIMA QUINTA: Las partes acuerdan que todas las invenciones, descubrimientos y trabajos originales concebidos o hechos por EL TRABAJADOR en vigencia del presente contrato pertenecerán a EL EMPLEADOR, por lo cual EL TRABAJADOR se obliga a informar a EL EMPLEADOR de forma inmediata sobre la existencia de dichas invenciones y/o trabajos originales. EL TRABAJADOR accederá a facilitar el cumplimiento oportuno de las correspondientes formalidades y dará su firma o extenderá los poderes y documentos necesarios para transferir la propiedad intelectual a EL EMPLEADOR cuando así se lo solicite. Teniendo en cuenta lo dispuesto en la normatividad de derechos de autor y lo estipulado anteriormente, las partes acuerdan que el salario devengado contiene la remuneración por la transferencia de todo tipo de propiedad intelectual, razón por la cual no se causará ninguna compensación adicional.',
                    ],
                    style: 'texto2'
            },
            {
                    text: [
                            'DÉCIMA SEXTA: AUTORIZACIÓN DE DESCUENTOS. - EL TRABAJADOR, desde ahora, mediante este escrito y en forma EXPRESA AUTORIZA a EL EMPLEADOR para que cuando termine el presente contrato por cualquier causa o durante su vigencia, descuente del valor de sus salarios, prestaciones sociales, vacaciones e indemnizaciones, las sumas de dinero que llegare a adeudarle por concepto de: a) Avances o anticipos de salario. b) préstamos de dinero. c) El valor de las herramientas de trabajo, elementos de protección personal, equipos y maquinaria que haya recibido y que llegaren a faltar al hacer la entrega del inventario a su cargo, por su pérdida, extravío y/o apropiación indebida, en cualquier momento. d) El valor de los daños causados a bienes muebles (Herramientas, EPP, equipos, vehículos, entre otros) de propiedad de empleador que fueron entregados al trabajador para el correcto desempeño de su labor, salvo el deterioro natural. e) Sumas de dinero que llegaré a deber por manejo de dineros confiados en razón de sus funciones y/o de anticipos de gastos entregados.',
                    ],
                    style: 'texto2'
            },
            {
                    text: [
                            'DÉCIMA SÉPTIMA: Las partes con plena y total autonomía y en forma libre y sin presión de ninguna naturaleza convienen en definir que el trabajador deberá ser polivalente y multifuncional lo cual significa que dentro de la actividad contratada podrá desempeñar, cuando así lo disponga la empresa cualquier función relacionada con la misma.',
                    ],
                    style: 'texto2'
            },
            {
                    text: [
                            'DÉCIMA NOVENA: Las partes acuerdan en calificar como falta grave cualquier acto del trabajador que pueda considerarse de competencia desleal de conformidad con la ley, así el mismo se cometa por primera vez.',
                    ],
                    style: 'texto2'
            },
            {
                    text: [
                            'VIGÉSIMA: El trabajador se compromete aún después de la terminación de su relación laboral a tener confidencialidad sobre todo trabajo, investigación, conocimiento, ideas, materiales, procesos y cualquier aspecto a que haya tenido acceso o que haya llegado a tener conocimiento en la ejecución de su relación laboral, incluyendo todo lo concerniente a las mejores prácticas y a los procesos propios de la empresa.',
                    ],
                    style: 'texto2'
            },
            {
                    text: [
                            'VIGÉSIMA PRIMERA: EL TRABAJADOR para todos los efectos legales se compromete a informar por escrito y de manera inmediata a EL EMPLEADOR cualquier cambio en su dirección de residencia, teniéndose en todo caso como suya, la última dirección registrada en su hoja de vida.',
                    ],
                    style: 'texto2'
            },
            {
                    text: [
                            'VIGÉSIMA SEGUNDA: El empleado mediante este contrato declara que ha leído, entiende y acepta el contenido del mismo, el del Reglamento Interno de Trabajo, el Reglamento de Higiene y Seguridad Industrial, el Sistema de Gestión de Seguridad y Salud en el Trabajo y su manual de funciones. Se deja constancia con la firma de este contrato que estos documentos fueron entregados al TRABAJADOR.',
                    ],
                    style: 'texto2'
            },
            {
                    text: [
                            'VIGÉSIMA TERCERA: EFECTOS Y MODIFICACIONES. - El presente contrato reemplaza en su integridad y deja sin efecto cualquier otro contrato, verbal o escrito, celebrado entre las partes con anterioridad. Pudiendo las partes convenir por escrito modificaciones y/o adiciones al mismo, las que formarán parte integral de este contrato.',
                    ],
                    style: 'texto2'
            },
            {
                    text: [
                      `Para constancia y una vez leído por las presentes partes, le dan su consentimiento expreso y lo firman en dos ejemplares del mismo tenor, el día ${infoUser[0].fecha_ingreso}, en el Municipio ${infoProject.municipio}, de ${infoProject.departamento}`,
                    ],
                    style: 'texto2'
            },
            {
          
        
          columns: [
              {
                  style: 'firma',
                  type: 'none',
              ul: [
                      '_______________________________',
                      `${infoProject.contratista}`,
                      `C.C ${infoProject.cedula_rep_legal}`,
                      `NIT. ${infoProject.nit}`,
                      `Ing. R.L. ${infoProject.nombre_rep_legal}`,
                      'EMPLEADOR'
                  ],
              },
              {
                  style: 'firma2',
                  type: 'none',
                  ul: [
                          '_______________________________',
                          `${infoUser[0].nombre} ${infoUser[0].apellido}`,
                          `C.C ${infoUser[0].cedula}`,
                          'TRABAJADOR',
                      ],
              }
          ],
          
        },
    
        
        
      ],
      styles: {
        header: {
          fontSize: 12,
          alignment: 'left',
          margin: [50, 20, 0, 0]
        },
        header2: {
          fontSize: 12,
          bold: true,
          alignment: 'center',
          margin: [50, 20, 0, 0]
        },
        subheader: {
          fontSize: 14
          
        },
        subtitulo: {
            bold: true,
            margin: [50, 40, 0, 30],
          fontSize: 13
        },
        texto: {
            margin: [50, 40, 50, 50],
            fontSize: 12,
            alignment: 'justify'
            
        },
        texto2: {
            margin: [50, -30, 0, 50],
            fontSize: 12,
            alignment: 'justify'
        },
        texto3: {
           margin: [50, -20, 0, 50],
           alignment: 'center',
           bold: true,
           fontSize: 12,
            
        },
        texto4: {
           margin: [50, -40, 0, 10],
           fontSize: 12,
            
        },
        texto5: {
           margin: [60, -20, 0, 50],
           bold: true,
           fontSize: 12,
            
        },
        texto6: {
           margin: [50, -40, 0, 50],
           fontSize: 12,
            
        },
        texto7: {
           margin: [50, -30, 0, 50],
           fontSize: 12,
           alignment: 'justify'
            
        },
        texto8: {
           margin: [60, -20, 0, 50],
           fontSize: 12,
           alignment: 'justify'
            
        },
        texto9: {
            margin: [10, 20, 0, 50],
            fontSize: 12,
            alignment: 'justify'
        },
            firma: {
                bold:true,
                fontSize: 12,
                margin: [40, 0, 0, 50],
    
          },
          firma2: {
          bold:true,
            fontSize: 12,
            margin: [50, 0, 0, 30],
    
          },
    }
    }
    const pdfRENUNCIA = pdfMake.createPdf(CONTRACT);
    pdfRENUNCIA.open();
  }
}
