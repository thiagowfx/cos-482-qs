package br.ufrj.cos482.web.rest;

import br.ufrj.cos482.Cos482App;

import br.ufrj.cos482.domain.DocumentoSistema;
import br.ufrj.cos482.repository.DocumentoSistemaRepository;
import br.ufrj.cos482.service.DocumentoSistemaService;
import br.ufrj.cos482.service.dto.DocumentoSistemaDTO;
import br.ufrj.cos482.service.mapper.DocumentoSistemaMapper;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.ufrj.cos482.domain.enumeration.StatusDocumento;
/**
 * Test class for the DocumentoSistemaResource REST controller.
 *
 * @see DocumentoSistemaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Cos482App.class)
public class DocumentoSistemaResourceIntTest {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").withZone(ZoneId.of("Z"));

    private static final String DEFAULT_TIPO = "AAAAA";
    private static final String UPDATED_TIPO = "BBBBB";
    private static final String DEFAULT_FORMATO = "AAAAA";
    private static final String UPDATED_FORMATO = "BBBBB";

    private static final ZonedDateTime DEFAULT_TIMESTAMP_ENVIO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_TIMESTAMP_ENVIO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_TIMESTAMP_ENVIO_STR = dateTimeFormatter.format(DEFAULT_TIMESTAMP_ENVIO);

    private static final StatusDocumento DEFAULT_STATUS = StatusDocumento.PENDETE;
    private static final StatusDocumento UPDATED_STATUS = StatusDocumento.ENVIADO;

    private static final Integer DEFAULT_ESCOPO = 1;
    private static final Integer UPDATED_ESCOPO = 2;
    private static final String DEFAULT_CAMINHO = "AAAAA";
    private static final String UPDATED_CAMINHO = "BBBBB";

    @Inject
    private DocumentoSistemaRepository documentoSistemaRepository;

    @Inject
    private DocumentoSistemaMapper documentoSistemaMapper;

    @Inject
    private DocumentoSistemaService documentoSistemaService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restDocumentoSistemaMockMvc;

    private DocumentoSistema documentoSistema;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DocumentoSistemaResource documentoSistemaResource = new DocumentoSistemaResource();
        ReflectionTestUtils.setField(documentoSistemaResource, "documentoSistemaService", documentoSistemaService);
        this.restDocumentoSistemaMockMvc = MockMvcBuilders.standaloneSetup(documentoSistemaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentoSistema createEntity(EntityManager em) {
        DocumentoSistema documentoSistema = new DocumentoSistema()
                .tipo(DEFAULT_TIPO)
                .formato(DEFAULT_FORMATO)
                .timestampEnvio(DEFAULT_TIMESTAMP_ENVIO)
                .status(DEFAULT_STATUS)
                .escopo(DEFAULT_ESCOPO)
                .caminho(DEFAULT_CAMINHO);
        return documentoSistema;
    }

    @Before
    public void initTest() {
        documentoSistema = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentoSistema() throws Exception {
        int databaseSizeBeforeCreate = documentoSistemaRepository.findAll().size();

        // Create the DocumentoSistema
        DocumentoSistemaDTO documentoSistemaDTO = documentoSistemaMapper.documentoSistemaToDocumentoSistemaDTO(documentoSistema);

        restDocumentoSistemaMockMvc.perform(post("/api/documento-sistemas")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(documentoSistemaDTO)))
                .andExpect(status().isCreated());

        // Validate the DocumentoSistema in the database
        List<DocumentoSistema> documentoSistemas = documentoSistemaRepository.findAll();
        assertThat(documentoSistemas).hasSize(databaseSizeBeforeCreate + 1);
        DocumentoSistema testDocumentoSistema = documentoSistemas.get(documentoSistemas.size() - 1);
        assertThat(testDocumentoSistema.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testDocumentoSistema.getFormato()).isEqualTo(DEFAULT_FORMATO);
        assertThat(testDocumentoSistema.getTimestampEnvio()).isEqualTo(DEFAULT_TIMESTAMP_ENVIO);
        assertThat(testDocumentoSistema.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testDocumentoSistema.getEscopo()).isEqualTo(DEFAULT_ESCOPO);
        assertThat(testDocumentoSistema.getCaminho()).isEqualTo(DEFAULT_CAMINHO);
    }

    @Test
    @Transactional
    public void getAllDocumentoSistemas() throws Exception {
        // Initialize the database
        documentoSistemaRepository.saveAndFlush(documentoSistema);

        // Get all the documentoSistemas
        restDocumentoSistemaMockMvc.perform(get("/api/documento-sistemas?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(documentoSistema.getId().intValue())))
                .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
                .andExpect(jsonPath("$.[*].formato").value(hasItem(DEFAULT_FORMATO.toString())))
                .andExpect(jsonPath("$.[*].timestampEnvio").value(hasItem(DEFAULT_TIMESTAMP_ENVIO_STR)))
                .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
                .andExpect(jsonPath("$.[*].escopo").value(hasItem(DEFAULT_ESCOPO)))
                .andExpect(jsonPath("$.[*].caminho").value(hasItem(DEFAULT_CAMINHO.toString())));
    }

    @Test
    @Transactional
    public void getDocumentoSistema() throws Exception {
        // Initialize the database
        documentoSistemaRepository.saveAndFlush(documentoSistema);

        // Get the documentoSistema
        restDocumentoSistemaMockMvc.perform(get("/api/documento-sistemas/{id}", documentoSistema.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentoSistema.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.formato").value(DEFAULT_FORMATO.toString()))
            .andExpect(jsonPath("$.timestampEnvio").value(DEFAULT_TIMESTAMP_ENVIO_STR))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.escopo").value(DEFAULT_ESCOPO))
            .andExpect(jsonPath("$.caminho").value(DEFAULT_CAMINHO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentoSistema() throws Exception {
        // Get the documentoSistema
        restDocumentoSistemaMockMvc.perform(get("/api/documento-sistemas/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentoSistema() throws Exception {
        // Initialize the database
        documentoSistemaRepository.saveAndFlush(documentoSistema);
        int databaseSizeBeforeUpdate = documentoSistemaRepository.findAll().size();

        // Update the documentoSistema
        DocumentoSistema updatedDocumentoSistema = documentoSistemaRepository.findOne(documentoSistema.getId());
        updatedDocumentoSistema
                .tipo(UPDATED_TIPO)
                .formato(UPDATED_FORMATO)
                .timestampEnvio(UPDATED_TIMESTAMP_ENVIO)
                .status(UPDATED_STATUS)
                .escopo(UPDATED_ESCOPO)
                .caminho(UPDATED_CAMINHO);
        DocumentoSistemaDTO documentoSistemaDTO = documentoSistemaMapper.documentoSistemaToDocumentoSistemaDTO(updatedDocumentoSistema);

        restDocumentoSistemaMockMvc.perform(put("/api/documento-sistemas")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(documentoSistemaDTO)))
                .andExpect(status().isOk());

        // Validate the DocumentoSistema in the database
        List<DocumentoSistema> documentoSistemas = documentoSistemaRepository.findAll();
        assertThat(documentoSistemas).hasSize(databaseSizeBeforeUpdate);
        DocumentoSistema testDocumentoSistema = documentoSistemas.get(documentoSistemas.size() - 1);
        assertThat(testDocumentoSistema.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testDocumentoSistema.getFormato()).isEqualTo(UPDATED_FORMATO);
        assertThat(testDocumentoSistema.getTimestampEnvio()).isEqualTo(UPDATED_TIMESTAMP_ENVIO);
        assertThat(testDocumentoSistema.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testDocumentoSistema.getEscopo()).isEqualTo(UPDATED_ESCOPO);
        assertThat(testDocumentoSistema.getCaminho()).isEqualTo(UPDATED_CAMINHO);
    }

    @Test
    @Transactional
    public void deleteDocumentoSistema() throws Exception {
        // Initialize the database
        documentoSistemaRepository.saveAndFlush(documentoSistema);
        int databaseSizeBeforeDelete = documentoSistemaRepository.findAll().size();

        // Get the documentoSistema
        restDocumentoSistemaMockMvc.perform(delete("/api/documento-sistemas/{id}", documentoSistema.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<DocumentoSistema> documentoSistemas = documentoSistemaRepository.findAll();
        assertThat(documentoSistemas).hasSize(databaseSizeBeforeDelete - 1);
    }
}
