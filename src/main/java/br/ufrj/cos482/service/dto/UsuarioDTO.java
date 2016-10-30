package br.ufrj.cos482.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import br.ufrj.cos482.domain.enumeration.StatusConta;

/**
 * A DTO for the Usuario entity.
 */
public class UsuarioDTO implements Serializable {

    private Long id;

    @NotNull
    private String nome;

    private StatusConta conta;


    private Long cpfId;
    
    private Long rgId;
    
    private Long tituloDeEleitorId;
    
    private Long dispensaMilitarId;
    
    private Long passaporteId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
    public StatusConta getConta() {
        return conta;
    }

    public void setConta(StatusConta conta) {
        this.conta = conta;
    }

    public Long getCpfId() {
        return cpfId;
    }

    public void setCpfId(Long documentoIdentificacaoId) {
        this.cpfId = documentoIdentificacaoId;
    }

    public Long getRgId() {
        return rgId;
    }

    public void setRgId(Long documentoIdentificacaoId) {
        this.rgId = documentoIdentificacaoId;
    }

    public Long getTituloDeEleitorId() {
        return tituloDeEleitorId;
    }

    public void setTituloDeEleitorId(Long documentoIdentificacaoId) {
        this.tituloDeEleitorId = documentoIdentificacaoId;
    }

    public Long getDispensaMilitarId() {
        return dispensaMilitarId;
    }

    public void setDispensaMilitarId(Long documentoIdentificacaoId) {
        this.dispensaMilitarId = documentoIdentificacaoId;
    }

    public Long getPassaporteId() {
        return passaporteId;
    }

    public void setPassaporteId(Long documentoIdentificacaoId) {
        this.passaporteId = documentoIdentificacaoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UsuarioDTO usuarioDTO = (UsuarioDTO) o;

        if ( ! Objects.equals(id, usuarioDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "UsuarioDTO{" +
            "id=" + id +
            ", nome='" + nome + "'" +
            ", conta='" + conta + "'" +
            '}';
    }
}
